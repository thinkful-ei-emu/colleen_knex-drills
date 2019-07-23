INSERT INTO blogful_articles (title, date_published, content)
VALUES
('How we won the championship', now()-'30 days'::INTERVAL, 'We played hard and good and fast, that''s how we did it!'),
('My favorite cat', now()-'1 days'::INTERVAL, 'His name is Conga and he is black and tan and likes to kill birds'),
('Where have all the cowboys gone?', now()-'10 days'::INTERVAL, 'Doo de doo de doo himmini himmiye himmini himmye'),
('An article', now(), 'yup it is'),
('Made this one quick', now(), 'sure did do it this way'),
('Why should I go to Ireland', now()-'5 days'::INTERVAL, 'just thinkin of some stuff on the top of my head'),
('Maybe I should have some coffee', now()-'2 days'::INTERVAL, 'Caffiene is god'),
('Sleepy dog', now()-'34 days'::INTERVAL, 'she is curled up in a tiny black ball'),
('Rainy day', now()-'10 days'::INTERVAL, 'I like when it''s rainy out because then the plants grow')
;