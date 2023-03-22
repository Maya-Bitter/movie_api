PGDMP     9    !                {            myFlixDB    15.2    15.2 ,    &           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            '           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            (           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            )           1262    16398    myFlixDB    DATABASE     �   CREATE DATABASE "myFlixDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE "myFlixDB";
                postgres    false            *           0    0    DATABASE "myFlixDB"    COMMENT     p   COMMENT ON DATABASE "myFlixDB" IS 'This database stores information about movies and users of the myFlix app.';
                   postgres    false    3369            �            1259    16409 	   directors    TABLE     �   CREATE TABLE public.directors (
    directorid integer NOT NULL,
    name character varying(50) NOT NULL,
    bio character varying(1000),
    birthyear date,
    deathyear date
);
    DROP TABLE public.directors;
       public         heap    postgres    false            �            1259    16408    directors_directorid_seq    SEQUENCE     �   CREATE SEQUENCE public.directors_directorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.directors_directorid_seq;
       public          postgres    false    217            +           0    0    directors_directorid_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.directors_directorid_seq OWNED BY public.directors.directorid;
          public          postgres    false    216            �            1259    16400    genres    TABLE     �   CREATE TABLE public.genres (
    genreid integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(1000)
);
    DROP TABLE public.genres;
       public         heap    postgres    false            �            1259    16399    genres_genreid_seq    SEQUENCE     �   CREATE SEQUENCE public.genres_genreid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.genres_genreid_seq;
       public          postgres    false    215            ,           0    0    genres_genreid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.genres_genreid_seq OWNED BY public.genres.genreid;
          public          postgres    false    214            �            1259    16418    movies    TABLE     
  CREATE TABLE public.movies (
    movieid integer NOT NULL,
    title character varying(50) NOT NULL,
    description character varying(1000),
    directorid integer NOT NULL,
    genreid integer NOT NULL,
    imageurl character varying(300),
    featured boolean
);
    DROP TABLE public.movies;
       public         heap    postgres    false            �            1259    16417    movies_movieid_seq    SEQUENCE     �   CREATE SEQUENCE public.movies_movieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.movies_movieid_seq;
       public          postgres    false    219            -           0    0    movies_movieid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.movies_movieid_seq OWNED BY public.movies.movieid;
          public          postgres    false    218            �            1259    16449    user_movies    TABLE     o   CREATE TABLE public.user_movies (
    usermovieid integer NOT NULL,
    userid integer,
    movieid integer
);
    DROP TABLE public.user_movies;
       public         heap    postgres    false            �            1259    16448    user_movies_usermovieid_seq    SEQUENCE     �   CREATE SEQUENCE public.user_movies_usermovieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.user_movies_usermovieid_seq;
       public          postgres    false    223            .           0    0    user_movies_usermovieid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.user_movies_usermovieid_seq OWNED BY public.user_movies.usermovieid;
          public          postgres    false    222            �            1259    16442    users    TABLE     �   CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    birth_date date
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16441    users_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_userid_seq;
       public          postgres    false    221            /           0    0    users_userid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
          public          postgres    false    220            z           2604    16412    directors directorid    DEFAULT     |   ALTER TABLE ONLY public.directors ALTER COLUMN directorid SET DEFAULT nextval('public.directors_directorid_seq'::regclass);
 C   ALTER TABLE public.directors ALTER COLUMN directorid DROP DEFAULT;
       public          postgres    false    216    217    217            y           2604    16403    genres genreid    DEFAULT     p   ALTER TABLE ONLY public.genres ALTER COLUMN genreid SET DEFAULT nextval('public.genres_genreid_seq'::regclass);
 =   ALTER TABLE public.genres ALTER COLUMN genreid DROP DEFAULT;
       public          postgres    false    214    215    215            {           2604    16421    movies movieid    DEFAULT     p   ALTER TABLE ONLY public.movies ALTER COLUMN movieid SET DEFAULT nextval('public.movies_movieid_seq'::regclass);
 =   ALTER TABLE public.movies ALTER COLUMN movieid DROP DEFAULT;
       public          postgres    false    219    218    219            }           2604    16452    user_movies usermovieid    DEFAULT     �   ALTER TABLE ONLY public.user_movies ALTER COLUMN usermovieid SET DEFAULT nextval('public.user_movies_usermovieid_seq'::regclass);
 F   ALTER TABLE public.user_movies ALTER COLUMN usermovieid DROP DEFAULT;
       public          postgres    false    222    223    223            |           2604    16445    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    221    220    221                      0    16409 	   directors 
   TABLE DATA           P   COPY public.directors (directorid, name, bio, birthyear, deathyear) FROM stdin;
    public          postgres    false    217   �0                 0    16400    genres 
   TABLE DATA           <   COPY public.genres (genreid, name, description) FROM stdin;
    public          postgres    false    215   d6                 0    16418    movies 
   TABLE DATA           f   COPY public.movies (movieid, title, description, directorid, genreid, imageurl, featured) FROM stdin;
    public          postgres    false    219   9       #          0    16449    user_movies 
   TABLE DATA           C   COPY public.user_movies (usermovieid, userid, movieid) FROM stdin;
    public          postgres    false    223   �>       !          0    16442    users 
   TABLE DATA           N   COPY public.users (userid, username, password, email, birth_date) FROM stdin;
    public          postgres    false    221   0?       0           0    0    directors_directorid_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.directors_directorid_seq', 9, true);
          public          postgres    false    216            1           0    0    genres_genreid_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.genres_genreid_seq', 5, true);
          public          postgres    false    214            2           0    0    movies_movieid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.movies_movieid_seq', 10, true);
          public          postgres    false    218            3           0    0    user_movies_usermovieid_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.user_movies_usermovieid_seq', 9, true);
          public          postgres    false    222            4           0    0    users_userid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.users_userid_seq', 8, true);
          public          postgres    false    220            �           2606    16416    directors directors_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.directors
    ADD CONSTRAINT directors_pkey PRIMARY KEY (directorid);
 B   ALTER TABLE ONLY public.directors DROP CONSTRAINT directors_pkey;
       public            postgres    false    217                       2606    16407    genres genres_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (genreid);
 <   ALTER TABLE ONLY public.genres DROP CONSTRAINT genres_pkey;
       public            postgres    false    215            �           2606    16425    movies movies_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (movieid);
 <   ALTER TABLE ONLY public.movies DROP CONSTRAINT movies_pkey;
       public            postgres    false    219            �           2606    16454    user_movies user_movies_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.user_movies
    ADD CONSTRAINT user_movies_pkey PRIMARY KEY (usermovieid);
 F   ALTER TABLE ONLY public.user_movies DROP CONSTRAINT user_movies_pkey;
       public            postgres    false    223            �           2606    16447    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    221            �           2606    16431    movies directorkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT directorkey FOREIGN KEY (directorid) REFERENCES public.directors(directorid);
 <   ALTER TABLE ONLY public.movies DROP CONSTRAINT directorkey;
       public          postgres    false    217    3201    219            �           2606    16426    movies genrekey    FK CONSTRAINT     t   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT genrekey FOREIGN KEY (genreid) REFERENCES public.genres(genreid);
 9   ALTER TABLE ONLY public.movies DROP CONSTRAINT genrekey;
       public          postgres    false    3199    215    219            �           2606    16460    user_movies moviekey    FK CONSTRAINT     y   ALTER TABLE ONLY public.user_movies
    ADD CONSTRAINT moviekey FOREIGN KEY (movieid) REFERENCES public.movies(movieid);
 >   ALTER TABLE ONLY public.user_movies DROP CONSTRAINT moviekey;
       public          postgres    false    223    3203    219            �           2606    16455    user_movies userkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.user_movies
    ADD CONSTRAINT userkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 =   ALTER TABLE ONLY public.user_movies DROP CONSTRAINT userkey;
       public          postgres    false    223    3205    221               l  x��V]S9|6�b�H��>L��f � P����hwǻ:��O�������.�H�KU*x�1��ii<x��`Ks�&g_�0@:��4m��?f�4Tj�Et>��ב=V�4��l�#�R��rk��3�Ś閗���Z:W{����2"�W���W<�m@�0�l�T�`
��B[¬5kP
suã�D$i��(��k�"âpF�2Ҷ0m�m�՞��ƛM�ʗ�W��rEg䵳��̵��{�.[mJ9�gn�?.�N/�[π�����F��T�G���H�z&Pju�V������`����{��K���n�58�??Ɇ�1Z�]EU��O4� ���*��s�c�J�*
c�|��s�
i�#��\�t��9��Pw���u���-��ٌ�<Ǹ�/�Q��o�Z��z]rF�+�4��� 'd��<p�@>�� ��9�I9<���\����l�ͽ.j�/���϶�) =�)�4m�Q�P���U��<�h<9>AtL�1U��e��U�M�m���X�T����݈z4��M�ӣL�p�+�����O�u7���6*�ʫy�K��b$�Hװ��k<��Ǿ��-y���%G5�	�������Kԍ58Ay
����]�(u��A�=iI� t�]�uQj�H�vT��I�2jEl�A3�tx�ҸU�u��u��*�?����(r��KZ ��VE�1���oS�\zլ�?rxp�.�Gt��aت�G&\�c=��'��˶$��H�vp�>�5�O4x��Kc?��Yф{[��&�L{1Q ��h��F�b��r"i���J��2�S�o80�H���80/U<I@��h��~Xz2�PKF�}�цKm�x���� �eu��q֗ڡ!���B��*�u�W@z��Z���7��B-�=�ا-�5�JB�f���c����y/�]��<Kհ�a��H�ƟV�ʆg��ߎ7n@1�Dq0c��k����"��YכI��e��w'����B�4����5�=����ω����n��57��UQ;�*,7r[��廾�ug&i*э}���!JIG���+�X/\�Bu���#�ǇN�N�(˶�UQ�~��j�d�k��"o�M%1W��)���nuwsK6_p�2��a�}�q{�*�'��������Z��2���3L�#q2PS%f�{���5g�t���$���%��㩮P���͍
������]@eTl`�������L���6����N�����м����v7�i_�n�����|{q�q��q2�R��-�V������ѡ��	�ӌ;��*<'A�R�jѬ伍I�s\����Z/ޯ3y��Z���l��(�g5�A���:�Eu.��o5�����޿���         �  x�eTˎ�0<'_�cl������c/�M�jd�%����l��A�1����4����B���)]�^��U[$��C���Qn�(1��r��%e?�B!�W1��](2K*ĩA		���AR'���w�Y�m����5��QQ��K�pvr}�����P�J�PZr����EM�D�:^�H�"	d����s�����t�f. h�gި�te��9٘�,��K��ɠ��|m�Hl��u��B�&�A�E;��RBG����V&��1hmh����#0C"ݔ¯
��I�Ow41H�]��B�%��ŶnҨc@yT��rNw��:K�ݖݑ�vk��:�nj^�Иd^&6\�GA�ΚO�4�-J�p����f�ȫ,P�::dV_yF� �
�w��
��\�q�U�H���HV�O@#�r�0������[��ｯ����7���c�찫So���û��[H .������SCy��̦��yM���×�����W�´£���vȼ�O�-?���mqg��<���MZ�p�6k�cz�5s�g����nz)ך;j�I���\�1��<��Ʃ�҇s�v}�,�M<�>�Aށ>�%�;�rKb��K0�uZ�����}`�b�w�j�5���T]�[7�����?N����a         �  x��V�v�8\;_qw�	$����y5�<�Ϝ3G�d[A�<��CV���%S�@�Y��%ݪ[UW��!+��F�O�nt��c�(�FQ�ί��T���&h�B����a!<�^HA,�$��WA�tMVҕju(��
�{W�/Ew�CjKm�^Q���E�`��-�x%Yw�l���8o$���٬��㤌��ڶ�c��-��i��� ����៨���_R�rx����O����O?���Q}��nv�����H��0�1+�R�sZ��2a����k"M�����X�|��>�*w^u籤T�XJ�ڧ�d�cV�9k���hg�,�1�f�� +U�L��9xWTk��>^er��y6��j��<����t2#Q(�&5vU:G�Q��
�r)��}��f]$gQ�2����c��>��^-����woJ߾��o��ߗ�׋�Fcy}�ˇ�ۦ)G�ܫWP����ʂ�wB��T
R�I%X� �<Ӷ�-�=$E���.A��uNB�n�%�z��1&;�|���R	�h�S!��'��h'����S�8:�܏�������t~��Cl�'��{�����I �wmG���[�8��3�wM��
���7� .B�E��`����*"ZJ���Y�Ԟj0V�wl_��OF;vvx�cuq-~\����u�]���=��U��z�LuQF�0M�.��U���T/uU
ڃ���4BBרpE���cTIY)�'���PzŖE���޵<,.]�?Y�lZ�� Ƌzէ�>���:B������Z3��� u|ʻ�3T>u;���ڢk���Q�>�Q��oߴb�a҅��E�J��N��P���Q�K� �O�vlG=Mn�j�P�NNg�����/��h^]]o�q�q����y�L��2.����[�BD4+Z��l���s�`4~��
�$D9��dH�wېa��2�$0��Vê�����P���(�o..��k=2���|x~�*�7�΀������!2��& �f�Tr�f��j���X�p`�X2��@2:W�T!~j���O���k̊.haRtb�1���?,������1��{���-Qؕ��8�(4�0��O�u(#�k���1���R�N+�2�Lm�9�m�{?9�Q-·�e6Y���Ͽ�i�.�_��Q�o�j��S�Tg��i��0J`d���c��՘�.8|d<���x��Dv���E��n"ķq|+�%���Խ�Π0�����6�*��Q�P<� �����n`�3o�Y��j=�u���scS�����T�-�R�n.�*l����x�'zf��$Ϊ���c2OGW�Y��~��:8Ln���\;M�t(�a�����*+�qEG������:AΤ5_M*���ގ�f�o�E�>�A���֦HN	$�ƅS��.U��D�������|���t���D�aj��H�{x9�=N���닏���fx��B��������@-      #   5   x�ʻ  �К�?����>��&na��ޙ���L�2H����5����      !   �   x�E���0�绷�]�Oۭ0��A"T��I�D��	Y�������st>"���9�����M���ߵ�`���"la��0Ht-Y[�l���X<��6��f���m(�t�����ʦi��o��@)�     