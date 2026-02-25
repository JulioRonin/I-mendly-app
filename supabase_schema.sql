-- Supabase SQL Schema for I Mendly

-- 1. Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon TEXT,
    type TEXT CHECK (type IN ('MAINTENANCE', 'DESIGN', 'REPAIR')),
    description TEXT,
    theme TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Zones (Service Areas)
CREATE TABLE zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Providers
CREATE TABLE providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    specialty TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    reviews INTEGER DEFAULT 0,
    mendly_ready BOOLEAN DEFAULT TRUE,
    price_per_hour DECIMAL(10,2),
    distance_label TEXT,
    avatar_url TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Provider-Zone Relationship (Many-to-Many)
CREATE TABLE provider_zones (
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
    zone_id UUID REFERENCES zones(id) ON DELETE CASCADE,
    PRIMARY KEY (provider_id, zone_id)
);

-- 5. Sub-Services (Portfolio of specific services)
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2),
    unit TEXT, -- 'Servicio', 'Mt2', 'Pz', etc.
    duration_days INTEGER,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Provider-Service Link (Provider specific portfolio & pricing)
CREATE TABLE provider_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    custom_price DECIMAL(10,2),
    custom_description TEXT,
    UNIQUE(provider_id, service_id)
);

-- 7. Provider Portfolio Photos
CREATE TABLE provider_portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Variables/Attributes for Services (Optional - for advanced pricing)
CREATE TABLE service_variables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    options JSONB, -- e.g. ["1 planta", "2 plantas"]
    price_impact JSONB -- e.g. {"1 planta": 0, "2 plantas": 500}
);

-- Initial Data Helper
-- INSERT INTO zones (name) VALUES ('4 Siglos'), ('Las Misiones'), ('Sendero'), ('Las Torres'), ('Centro'), ('Tecnologico'), ('Zaragoza');
