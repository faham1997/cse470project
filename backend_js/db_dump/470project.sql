--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-03-29 18:32:09 +06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 215 (class 1255 OID 49213)
-- Name: f_truncate_tables(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.f_truncate_tables(_username text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
   RAISE NOTICE '%', 
   -- EXECUTE  -- dangerous, test before you execute!
  (SELECT 'TRUNCATE TABLE '
       || string_agg(format('%I.%I', schemaname, tablename), ', ')
       || ' CASCADE'
   FROM   pg_tables
   WHERE  tableowner = _username
   AND    schemaname = 'public'
   );
END
$$;


ALTER FUNCTION public.f_truncate_tables(_username text) OWNER TO postgres;

--
-- TOC entry 214 (class 1255 OID 32823)
-- Name: union_all_tables(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.union_all_tables() RETURNS TABLE(id integer, full_name character varying, col3 character varying, col4 numeric, col5 character, version bigint)
    LANGUAGE plpgsql
    AS $$
DECLARE
  dynamic_query text = '';
  r_row         record;
BEGIN
  FOR r_row IN SELECT table_schema || '.' || table_name qualified_table_name
               FROM information_schema.tables
               WHERE table_schema = 'staging'
                 AND table_name LIKE '%_postfix'
    LOOP
      dynamic_query := dynamic_query || format('UNION SELECT ' ||
                                               'id, ' ||
                                               'full_name, ' ||
                                               'col3, ' ||
                                               'col4, ' ||
                                               'col5, ' ||
                                               'version ' ||
                                               'FROM %s ', r_row.qualified_table_name) || E'\n'; -- adding new line for pretty print, it is not necessary
    END LOOP;

  -- before we execute the query, we need to remove first "UNION " from the string
  dynamic_query := SUBSTRING(dynamic_query, 7) || ';';

  -- printing the statement as a notice so you know that the statement is in a good format, 
  -- or you can copy paste it and try it in the console to know if that statement is working or not. 
  RAISE NOTICE 'Union all tables in staging, executing statement: %', dynamic_query;
  RETURN QUERY EXECUTE dynamic_query;
END;
$$;


ALTER FUNCTION public.union_all_tables() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 41029)
-- Name: all_appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.all_appointment (
    doctor_id character varying(100),
    hospital_id character varying(100),
    apt_id character varying(100)
);


ALTER TABLE public.all_appointment OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 32834)
-- Name: appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment (
    apt_id character varying(100) NOT NULL,
    apt_time character varying(100) NOT NULL
);


ALTER TABLE public.appointment OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16386)
-- Name: doctor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor (
    doctor_id character varying(100) NOT NULL,
    doctor_name character varying(100) NOT NULL,
    specialization character varying(100) NOT NULL,
    gender character(1) NOT NULL
);


ALTER TABLE public.doctor OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 24585)
-- Name: hospital; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hospital (
    hospital_id character varying(100) NOT NULL,
    hospital_name character varying(100) NOT NULL,
    hospital_type character varying(100) NOT NULL,
    hospital_location character varying(100) NOT NULL,
    hospital_phone character varying(100),
    hospital_website character varying(100)
);


ALTER TABLE public.hospital OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 49234)
-- Name: all_appointments; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.all_appointments AS
 SELECT doctor.doctor_name,
    hospital.hospital_name,
    appointment.apt_time
   FROM public.all_appointment,
    public.appointment,
    public.doctor,
    public.hospital
  WHERE (((all_appointment.apt_id)::text = (appointment.apt_id)::text) AND ((all_appointment.doctor_id)::text = (doctor.doctor_id)::text) AND ((all_appointment.hospital_id)::text = (hospital.hospital_id)::text));


ALTER TABLE public.all_appointments OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 32806)
-- Name: doctor_education; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_education (
    doctor_id character varying(100),
    qualification character varying(100)
);


ALTER TABLE public.doctor_education OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 32785)
-- Name: doctor_hospital; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_hospital (
    doctor_id character varying(100),
    hospital_id character varying(100)
);


ALTER TABLE public.doctor_hospital OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 32819)
-- Name: doctor_info; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.doctor_info AS
 SELECT doctor.doctor_name,
    doctor.specialization,
    doctor_education.qualification,
    doctor.gender,
    hospital.hospital_name
   FROM public.doctor,
    public.hospital,
    public.doctor_hospital,
    public.doctor_education
  WHERE (((doctor.doctor_id)::text = (doctor_hospital.doctor_id)::text) AND ((hospital.hospital_id)::text = (doctor_hospital.hospital_id)::text) AND ((doctor.doctor_id)::text = (doctor_education.doctor_id)::text));


ALTER TABLE public.doctor_info OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 32769)
-- Name: education; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.education (
    qualification character varying(100) NOT NULL
);


ALTER TABLE public.education OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 32802)
-- Name: hospital_info; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.hospital_info AS
 SELECT hospital.hospital_name,
    hospital.hospital_type,
    doctor.doctor_name,
    hospital.hospital_location,
    hospital.hospital_phone,
    hospital.hospital_website
   FROM public.doctor,
    public.hospital,
    public.doctor_hospital
  WHERE (((doctor.doctor_id)::text = (doctor_hospital.doctor_id)::text) AND ((hospital.hospital_id)::text = (doctor_hospital.hospital_id)::text));


ALTER TABLE public.hospital_info OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 41047)
-- Name: user_apt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_apt (
    user_id character varying(100),
    apt_id character varying(100),
    apt_date character varying(100)
);


ALTER TABLE public.user_apt OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 32829)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    pass_hash character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2997 (class 0 OID 41029)
-- Dependencies: 211
-- Data for Name: all_appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.all_appointment (doctor_id, hospital_id, apt_id) FROM stdin;
zsen	AlHoAb	a
zsen	AlHoAb	b
ymll	CoClDh	d
ymll	CoClDh	e
Kuti	CoClDh	f
Kuit	CoClDh	a
z mt	BaHoMi	c
rKch	BaHoMi	c
\.


--
-- TOC entry 2996 (class 0 OID 32834)
-- Dependencies: 210
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointment (apt_id, apt_time) FROM stdin;
a	11:30AM
b	12:30PM
c	3:30PM
d	11:00PM
e	9:30PM
f	9:00PM
\.


--
-- TOC entry 2990 (class 0 OID 16386)
-- Dependencies: 202
-- Data for Name: doctor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor (doctor_id, doctor_name, specialization, gender) FROM stdin;
zsen	Reza Hossain	General	m
Lngi	Labiba Khan	Dermatologist	f
ymll	Lucky Ahmed	Dermatologist	f
Kuti	Khurshed Haque	Orthopedist	f
Kuit	Khurshed Islam	Psychiatrist	f
z mt	Reza Haque	Dermatologist	m
rKch	Khurshed Haque	Psychiatrist	f
aKrh	Reza Khan	Orthopedist	m
astt	Labiba Hossain	Orthopedist	m
s sr	Ashraf Haque	Psychiatrist	f
\.


--
-- TOC entry 2994 (class 0 OID 32806)
-- Dependencies: 207
-- Data for Name: doctor_education; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor_education (doctor_id, qualification) FROM stdin;
zsen	MBBS
Lngi	MBBS
ymll	MBBS
Kuti	MBBS
Kuit	MBBS
z mt	MBBS
rKch	MBBS
Kuit	FCPS
Lngi	FCPS
\.


--
-- TOC entry 2993 (class 0 OID 32785)
-- Dependencies: 205
-- Data for Name: doctor_hospital; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor_hospital (doctor_id, hospital_id) FROM stdin;
zsen	AlHoAb
Lngi	AlHoAb
ymll	CoClDh
Kuti	CoClDh
Kuit	CoClDh
z mt	BaHoMi
rKch	BaHoMi
\.


--
-- TOC entry 2992 (class 0 OID 32769)
-- Dependencies: 204
-- Data for Name: education; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.education (qualification) FROM stdin;
MBBS
FCPS
\.


--
-- TOC entry 2991 (class 0 OID 24585)
-- Dependencies: 203
-- Data for Name: hospital; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hospital (hospital_id, hospital_name, hospital_type, hospital_location, hospital_phone, hospital_website) FROM stdin;
AlHoAb	Alo Hospital	Hospital	Abdullapur	\N	\N
BaHoMi	Batash Hospital	Hospital	Mirpur	\N	\N
CoClDh	Comfort Clinic	Clinic	Dhanmondi	\N	\N
\.


--
-- TOC entry 2998 (class 0 OID 41047)
-- Dependencies: 212
-- Data for Name: user_apt; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_apt (user_id, apt_id, apt_date) FROM stdin;
\.


--
-- TOC entry 2995 (class 0 OID 32829)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, name, pass_hash) FROM stdin;
\.


--
-- TOC entry 2851 (class 2606 OID 41061)
-- Name: appointment appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_pkey PRIMARY KEY (apt_id);


--
-- TOC entry 2843 (class 2606 OID 16390)
-- Name: doctor doctor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT doctor_pkey PRIMARY KEY (doctor_id);


--
-- TOC entry 2847 (class 2606 OID 32773)
-- Name: education education_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_pkey PRIMARY KEY (qualification);


--
-- TOC entry 2845 (class 2606 OID 24592)
-- Name: hospital hospital_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital
    ADD CONSTRAINT hospital_pkey PRIMARY KEY (hospital_id);


--
-- TOC entry 2849 (class 2606 OID 32833)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2858 (class 2606 OID 41062)
-- Name: all_appointment all_appointment_apt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.all_appointment
    ADD CONSTRAINT all_appointment_apt_id_fkey FOREIGN KEY (apt_id) REFERENCES public.appointment(apt_id);


--
-- TOC entry 2856 (class 2606 OID 41032)
-- Name: all_appointment all_appointment_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.all_appointment
    ADD CONSTRAINT all_appointment_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctor(doctor_id);


--
-- TOC entry 2857 (class 2606 OID 41037)
-- Name: all_appointment all_appointment_hospital_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.all_appointment
    ADD CONSTRAINT all_appointment_hospital_id_fkey FOREIGN KEY (hospital_id) REFERENCES public.hospital(hospital_id);


--
-- TOC entry 2854 (class 2606 OID 32809)
-- Name: doctor_education doctor_education_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_education
    ADD CONSTRAINT doctor_education_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctor(doctor_id);


--
-- TOC entry 2855 (class 2606 OID 32814)
-- Name: doctor_education doctor_education_qualification_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_education
    ADD CONSTRAINT doctor_education_qualification_fkey FOREIGN KEY (qualification) REFERENCES public.education(qualification);


--
-- TOC entry 2852 (class 2606 OID 32788)
-- Name: doctor_hospital doctor_hospital_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_hospital
    ADD CONSTRAINT doctor_hospital_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctor(doctor_id);


--
-- TOC entry 2853 (class 2606 OID 32793)
-- Name: doctor_hospital doctor_hospital_hospital_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_hospital
    ADD CONSTRAINT doctor_hospital_hospital_id_fkey FOREIGN KEY (hospital_id) REFERENCES public.hospital(hospital_id);


--
-- TOC entry 2860 (class 2606 OID 41067)
-- Name: user_apt user_apt_apt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_apt
    ADD CONSTRAINT user_apt_apt_id_fkey FOREIGN KEY (apt_id) REFERENCES public.appointment(apt_id);


--
-- TOC entry 2859 (class 2606 OID 41050)
-- Name: user_apt user_apt_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_apt
    ADD CONSTRAINT user_apt_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2020-03-29 18:32:10 +06

--
-- PostgreSQL database dump complete
--
