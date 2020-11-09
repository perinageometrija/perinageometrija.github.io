CREATE TABLE  Autor(
	 SifA TEXT PRIMARY KEY,
	 Ime TEXT
);

CREATE TABLE Clan(
	 SifC TEXT PRIMARY KEY,
	 Ime TEXT
);

CREATE TABLE Drzi(
	 SifK TEXT,
	 SifC TEXT,
	 Datum DATE,
	 PRIMARY KEY (SifK, SifC)
);
 
CREATE TABLE Je_Autor(
	 SifA TEXT,
	 SifN TEXT,
	 Koji INTEGER,
	 PRIMARY KEY (SifA, SifN)
);
CREATE TABLE Knjiga(
	 SifK TEXT,
	 SifN TEXT,
	 PRIMARY KEY (SifK, SifN)
);
 
CREATE TABLE Naslov(
	 SifN TEXT,
	 Naziv TEXT,
	 SifO TEXT,
	 PRIMARY KEY (SifN, SifO)
);

CREATE TABLE Oblast(
	 SifO TEXT PRIMARY KEY,
	 Naziv TEXT
);
CREATE TABLE Pozajmica(
	 SifP  INTEGER,
	 SifC TEXT,
	 SifK TEXT,
	 Dana INTEGER,
	 PRIMARY KEY (SifP, SifC, SifK)
);
 
CREATE TABLE Rezervacija(
	 SifN TEXT,
	 SifC TEXT,
	 Datum  DATE,
	 PRIMARY KEY (SifN, SifC)
);

INSERT INTO   Autor  VALUES ('AP0', 'A.Popovic      ');
INSERT INTO   Autor  VALUES ('AP1', 'A.Petrovic     ');
INSERT INTO   Autor  VALUES ('DM0', 'D.Markovic     ');
INSERT INTO   Autor  VALUES ('IT0', 'I.Todorovic    ');
INSERT INTO   Autor  VALUES ('JN0', 'J.Nikolic      ');
INSERT INTO   Autor  VALUES ('ZN0', 'Z.Nikolic      ');
INSERT INTO   Autor  VALUES ('ZP0', 'Z.Petrovic     ');
INSERT INTO   Clan  VALUES ('DM0', 'D.Markovic     ');
INSERT INTO   Clan  VALUES ('DM1', 'D.Marinkovic   ');
INSERT INTO   Clan  VALUES ('JJ0', 'J.Jankovic     ');
INSERT INTO   Clan  VALUES ('JJ1', 'J.Jovanovic    ');
INSERT INTO   Clan  VALUES ('MM0', 'M.Markovic     ');
INSERT INTO   Clan  VALUES ('PP0', 'P.Petrovic     ');
INSERT INTO   Drzi  VALUES ('001', 'JJ0',  '1995-10-10 00:00:00.000');
INSERT INTO   Drzi  VALUES ('002', 'PP0',  '1995-01-15 00:00:00.000');
INSERT INTO   Drzi  VALUES ('004', 'JJ0',  '1995-10-18 00:00:00.000');
INSERT INTO   Drzi  VALUES ('005', 'JJ0',  '1995-12-15 00:00:00.000');
INSERT INTO   Je_Autor  VALUES ('AP0', 'RBP0', 1);
INSERT INTO   Je_Autor  VALUES ('AP1', 'PJC0', 1);
INSERT INTO   Je_Autor  VALUES ('DM0', 'PP00', 2);
INSERT INTO   Je_Autor  VALUES ('DM0', 'RK00', 1);
INSERT INTO   Je_Autor  VALUES ('IT0', 'PP00', 3);
INSERT INTO   Je_Autor  VALUES ('JN0', 'RBP0', 2);
INSERT INTO   Je_Autor  VALUES ('JN0', 'RK00', 2);
INSERT INTO   Je_Autor  VALUES ('ZN0', 'IP00', 1);
INSERT INTO   Je_Autor  VALUES ('ZP0', 'PJC0', 2);
INSERT INTO   Je_Autor  VALUES ('ZP0', 'PP00', 1);
INSERT INTO   Knjiga  VALUES ('001', 'RBP0');
INSERT INTO   Knjiga  VALUES ('002', 'RBP0');
INSERT INTO   Knjiga  VALUES ('003', 'RK00');
INSERT INTO   Knjiga  VALUES ('004', 'PJC0');
INSERT INTO   Knjiga  VALUES ('005', 'PJC0');
INSERT INTO   Knjiga  VALUES ('006', 'PJC0');
INSERT INTO   Knjiga  VALUES ('007', 'PP00');
INSERT INTO   Knjiga  VALUES ('008', 'PP00');
INSERT INTO   Knjiga  VALUES ('009', 'PP00');
INSERT INTO   Knjiga  VALUES ('010', 'IP00');
INSERT INTO   Knjiga  VALUES ('011', 'IP00');
INSERT INTO   Naslov  VALUES ('IP00', 'Internet i njegovi alati ', 'IP');
INSERT INTO   Naslov  VALUES ('PJC0', 'Programski jezik C       ', 'PJ');
INSERT INTO   Naslov  VALUES ('PJJ0', 'Programski jezik J++     ', 'PJ');
INSERT INTO   Naslov  VALUES ('PP00', 'PASCAL programiranje     ', 'PJ');
INSERT INTO   Naslov  VALUES ('PSQ0', 'Prog. SQL Servera 2000   ', 'BP');
INSERT INTO   Naslov  VALUES ('RBP0', 'Relacione baze podataka  ', 'BP');
INSERT INTO   Naslov  VALUES ('RK00', 'Racunarske komunikacije  ', 'RM');
INSERT INTO   Oblast  VALUES ('BP', 'Baze podataka       ');
INSERT INTO   Oblast  VALUES ('IP', 'Internet program.   ');
INSERT INTO   Oblast  VALUES ('PJ', 'Programski jezici   ');
INSERT INTO   Oblast  VALUES ('RM', 'Racunarske mreze    ');
INSERT INTO   Pozajmica  VALUES (1, 'JJ0', '004', 6);
INSERT INTO   Pozajmica  VALUES (2, 'PP0', '007', 2);
INSERT INTO   Pozajmica  VALUES (3, 'JJ1', '005', 6);
INSERT INTO   Pozajmica  VALUES (4, 'JJ0', '008', 7);
INSERT INTO   Pozajmica  VALUES (5, 'PP0', '002', 4);
INSERT INTO   Pozajmica  VALUES (6, 'JJ1', '009', 3);
INSERT INTO   Pozajmica  VALUES (7, 'MM0', '009', 4);
INSERT INTO   Pozajmica  VALUES (8, 'JJ1', '003', 3);
INSERT INTO   Pozajmica  VALUES (9, 'JJ1', '005', 6);
INSERT INTO   Pozajmica  VALUES (10, 'JJ0', '008', 5);
INSERT INTO   Pozajmica  VALUES (11, 'JJ0', '011', 5);
INSERT INTO   Pozajmica  VALUES (12, 'JJ0', '010', 5);
INSERT INTO   Pozajmica  VALUES (13, 'DM0', '007', 10);
INSERT INTO   Pozajmica  VALUES (14, 'DM1', '004', 2);
INSERT INTO   Pozajmica  VALUES (15, 'MM0', '008', 2);
INSERT INTO   Pozajmica  VALUES (16, 'MM0', '009', 1);
INSERT INTO   Pozajmica  VALUES (17, 'DM1', '007', 2);
INSERT INTO   Pozajmica  VALUES (18, 'DM0', '009', 1);
INSERT INTO   Rezervacija  VALUES ('IP00', 'DM1',  '1995-10-18 00:00:00.000');
INSERT INTO   Rezervacija  VALUES ('RBP0', 'JJ1',  '1995-10-18 00:00:00.000');
INSERT INTO   Rezervacija  VALUES ('RBP0', 'MM0',  '1995-10-18 00:00:00.000');
INSERT INTO   Rezervacija  VALUES ('RBP0', 'PP0',  '1997-10-18 00:00:00.000');
INSERT INTO   Rezervacija  VALUES ('RK00', 'JJ1',  '1995-10-18 00:00:00.000');

SELECT 'Baza radi!' as status;
select name,sql from sqlite_master where type='table';