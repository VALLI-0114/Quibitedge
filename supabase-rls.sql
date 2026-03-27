-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for all tables
CREATE POLICY "Allow public inserts on applications" ON applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public inserts on academic_details" ON academic_details FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public inserts on internship_preferences" ON internship_preferences FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public inserts on projects" ON projects FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public inserts on payments" ON payments FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public inserts on documents" ON documents FOR INSERT TO anon WITH CHECK (true);

-- Allow reads by app_id (for status checking and updates)
CREATE POLICY "Allow public read by app_id" ON applications FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public update by app_id" ON applications FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow public read related records" ON academic_details FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public update related records" ON academic_details FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow public read related records" ON internship_preferences FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public update related records" ON internship_preferences FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow public read related records" ON projects FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public update related records" ON projects FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow public read related records" ON payments FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public update related records" ON payments FOR UPDATE TO anon USING (true);

CREATE POLICY "Allow public read related records" ON documents FOR SELECT TO anon USING (true);
-- Allow public update related records
CREATE POLICY "Allow public update related records" ON documents FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow public delete related records" ON documents FOR DELETE TO anon USING (true);

-- Allow deletion for all other tables
CREATE POLICY "Allow public delete by app_id" ON applications FOR DELETE TO anon USING (true);
CREATE POLICY "Allow public delete related records" ON academic_details FOR DELETE TO anon USING (true);
CREATE POLICY "Allow public delete related records" ON internship_preferences FOR DELETE TO anon USING (true);
CREATE POLICY "Allow public delete related records" ON projects FOR DELETE TO anon USING (true);
CREATE POLICY "Allow public delete related records" ON payments FOR DELETE TO anon USING (true);
