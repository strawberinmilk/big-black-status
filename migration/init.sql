SET timezone TO 'UTC';
INSERT INTO public.parkings (id,"name",latitude,longitude,radius,"createdAt","updatedAt") VALUES
	 (1,'大黒PA',35.46164868963681,139.67996120452884,200,'2024-10-19 22:00:18.352856','2024-10-19 22:00:18.352856'),
	 (2,'大井PA',35.59311932692544,139.75485277136613,300,'2024-10-20 00:28:57.26499','2024-10-20 00:28:57.26499'),
	 (3,'市川PA',35.6768817869834,139.93227124214175,300,'2024-10-20 14:09:54.261879','2024-10-20 14:09:54.261879');
	 (4,'箱崎PA',35.682502916505676,139.78847265243533,50,'2024-10-20 14:09:54.277416','2024-10-20 14:09:54.277416'),
	 (5,'辰巳第一PA',35.64373957981527,139.8098069429398,100,'2024-10-20 14:09:54.279362','2024-10-20 14:09:54.279362'),
	 (6,'辰巳第二PA',35.64554436229445,139.81525719165805,100,'2024-10-20 14:13:45.045923','2024-10-20 14:13:45.045923'),
	 (7,'芝浦PA',35.643495451518845,139.75734829902652,200,'2024-10-20 14:13:45.048669','2024-10-20 14:13:45.048669'),
	 (8,'大師PA',35.53914088669749,139.74145352840426,50,'2024-10-20 14:13:45.050551','2024-10-20 14:13:45.050551'),
	 (9,'平和島PA',35.58556366221226,139.74139451980594,200,'2024-10-20 14:13:45.052817','2024-10-20 14:13:45.052817'),
	 (10,'川口PA',35.84706525883306,139.74226355552676,200,'2024-10-20 14:13:45.054552','2024-10-20 14:13:45.054552'),
	 (11,'八潮PA',35.80979152023394,139.84267473220828,150,'2024-10-20 14:13:45.056294','2024-10-20 14:13:45.056294'),
	 (12,'加平PA',35.77683514186286,139.82436597347262,50,'2024-10-20 14:13:45.058023','2024-10-20 14:13:45.058023'),
	 (13,'駒形PA',35.704621918699345,139.79631006717685,70,'2024-10-20 14:13:45.059762','2024-10-20 14:13:45.059762'),
	 (14,'志村PA',35.77417593148318,139.68477308750155,70,'2024-10-20 14:13:45.061425','2024-10-20 14:13:45.061425'),
	 (15,'南池袋PA',35.72309401073629,139.7223508358002,100,'2024-10-20 14:13:45.063075','2024-10-20 14:13:45.063075'),
	 (16,'代々木PA',35.681173925501874,139.69772815704349,70,'2024-10-20 14:13:45.06474','2024-10-20 14:13:45.06474'),
	 (17,'永福PA',35.66810070322358,139.64327394962314,70,'2024-10-20 14:13:45.066414','2024-10-20 14:13:45.066414'),
	 (18,'用賀PA',35.62649618510323,139.63104844093326,70,'2024-10-20 14:13:45.068213','2024-10-20 14:13:45.068213'),
INSERT INTO public.parking_roads (id,"name","parkingId") VALUES
	 (1,'上下線共通',1),
	 (2,'湾岸線西行き(横浜方面)',2),
	 (3,'湾岸線東行き(東京方面)',2),
	 (4,'湾岸線西行き',3),
	 (5,'上下線共通',4),
	 (6,'深川線上り',5),
	 (7,'深川線上り',6),
	 (8,'台場線上り',7),
	 (9,'横羽線下り',8),
	 (10,'羽田線上り(東京方面)',9),
	 (11,'羽田線下り(横浜方面)',9),
	 (12,'川口線上り',10),
	 (13,'三郷線上り',11),
	 (14,'三郷線下り',12),
	 (15,'向島線上り',13),
	 (16,'池袋線上り',14),
	 (17,'池袋線上り',15),
	 (18,'新宿線上り',16),
	 (19,'新宿線上り',17),
	 (20,'渋谷線上り',18);

INSERT INTO public.users (id,"screenName",name,email,"password","createdAt","updatedAt") VALUES
	 (1,'testUser','testUser','testUser','testUser','2024-10-22 02:02:26.652957+09','2024-10-22 02:02:28.544063+09'),
	 (2,'testUser2','testUser2','testUser2','testUser2','2024-10-22 02:02:26.652957+09','2024-10-22 02:02:28.544063+09'),
	 (3,'testUser3','testUser3','testUser3','testUser3','2024-10-22 02:02:26.652957+09','2024-10-22 02:02:28.544063+09');

INSERT INTO public.close_statuses (id,status,"statusJpName","createdAt","updatedAt") VALUES
	 (-1,'check_in','オープン','2024-11-09 14:36:44.660685+09','2024-11-09 14:36:44.660685+09'),
	 (1,'open','オープン','2024-11-09 14:36:44.660685+09','2024-11-09 14:36:44.660685+09'),
	 (2,'display_clear','閉鎖表示解除','2024-11-09 14:36:44.678376+09','2024-11-09 14:36:44.678376+09'),
	 (3,'close_display','閉鎖(掲示板)','2024-11-09 14:36:44.680108+09','2024-11-09 14:36:44.680108+09'),
	 (4,'close_local','閉鎖(直接確認)','2024-11-09 14:36:44.681735+09','2024-11-09 14:36:44.681735+09');
