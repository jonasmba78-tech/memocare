/* === DONNÉES · Module 2 « Corps & soins » : cours en bref (FICHE), exercices (EXO), mini-jeux, quiz supplémentaires ===
   Principe : quelqu’un qui n’a PAS lu les fiches doit pouvoir tout apprendre en faisant les exercices.
   → chaque exercice donne la règle ou le mot dans sa correction (champ w), et la fiche « Cours » résume l’essentiel.
   Formats : voir js/views/en-extra.js (en-tête).  FICHE[m]=[[titre,type,contenu],…]   EXO[m]=[{t,i,k,items:[…]},…] */
const FICHE={},EXO={},FPAGES={};
FICHE[2]=[
['Parler du corps : 4 règles','ul',[
'<b>Mon / ton / son</b> : on met toujours <b>my, your, his, her</b> devant la partie du corps. <i>My head hurts. Raise <u>your</u> arm. I wash <u>his</u> back.</i>',
'<b>Pluriels irréguliers</b> : one foot → two <b>feet</b> · one tooth → two <b>teeth</b> · one eye → two <b>eyes</b> (régulier). Les autres prennent -s : hands, fingers, knees, toes.',
'<b>Avoir mal</b> : <i>I have a headache / a toothache / a stomach ache / a backache / a sore throat / an earache.</i> Ou : <i>My back hurts.</i> ou <i>It hurts here.</i>',
'<b>Poser la question</b> : <i>Where does it hurt?</i> · <i>Does he have any pain?</i> · <i>Can you move your arm?</i>']],
['Les parties du corps par zone','tb',{h:['Zone','Mots anglais (à connaître)'],r:[
['Tête et visage','head, hair, forehead, eyebrow, eye, nose, ear, cheek, mouth, lips, teeth, tongue, chin'],
['Cou et tronc','neck, throat, shoulder, chest, back, lower back, belly, navel, hip, buttocks, armpit'],
['Bras et main','arm, elbow, forearm, wrist, hand, palm, finger, thumb, nail'],
['Jambe et pied','thigh, knee, shin, calf, ankle, foot (feet), heel, toe'],
['Organes','brain, windpipe, lungs, heart, liver, stomach, intestines, kidneys, bladder'],
['Os et muscles','skull, spine, ribs, pelvis, femur, kneecap, muscle, bone, joint']],sp:1}],
['Les organes : à quoi ça sert ?','tb',{h:['Organe','En anglais simple','Français'],r:[
['Brain','It controls the body and helps us think.','Il commande le corps et permet de penser.'],
['Heart','It pumps the blood.','Il pompe le sang.'],
['Lungs','We breathe with them.','On respire avec.'],
['Stomach','It digests the food.','Il digère les aliments.'],
['Liver','It cleans the blood.','Il nettoie le sang.'],
['Kidneys','They filter the blood and make urine.','Ils filtrent le sang et fabriquent l’urine.'],
['Bladder','It holds the urine.','Elle retient l’urine.'],
['Skull','It protects the brain.','Il protège le cerveau.'],
['Ribs','They protect the heart and lungs.','Elles protègent le cœur et les poumons.'],
['Spine','It holds the body up.','Elle soutient le corps.']],sp:1}],
['Consignes de soin à connaître','sp',[
['Raise your arm, please.','Levez le bras, s’il vous plaît.'],['Bend your knee slowly.','Pliez le genou doucement.'],['Turn your head to the left.','Tournez la tête vers la gauche.'],['Open your mouth and say “Ah”.','Ouvrez la bouche et dites « Ah ».'],['Breathe in… and breathe out.','Inspirez… et expirez.'],['Squeeze my hand.','Serrez-moi la main.'],['Stand up straight, please.','Tenez-vous droit, s’il vous plaît.']]],
['Soigner avec tact : annoncer, demander, rassurer','sp',[
['I will wash your back now.','Je vais vous laver le dos maintenant.'],['May I touch your arm?','Puis-je toucher votre bras ?'],['Is the water too hot?','L’eau est-elle trop chaude ?'],['Tell me if it hurts.','Dites-moi si ça fait mal.'],['Don’t worry. I’m here to help you.','Ne vous inquiétez pas. Je suis là pour vous aider.']]]
];
EXO[2]=[
{t:'1 · Traduis en anglais',i:'Écris le mot anglais (un seul mot). Après correction, tu vois la règle ou le piège.',k:'f',items:[
{q:'Tête',a:['head'],w:'head. Je lave la tête du bébé : I wash the baby’s head.'},
{q:'Œil',a:['eye','eyes'],w:'eye (pluriel : eyes). Close your eyes, please.'},
{q:'Nez',a:['nose'],w:'nose. Blow your nose.'},
{q:'Bouche',a:['mouth'],w:'mouth. Open your mouth, please.'},
{q:'Oreille',a:['ear','ears'],w:'ear. Un appareil auditif se porte dans l’oreille : hearing aid in the ear.'},
{q:'Cou',a:['neck'],w:'neck. Support the baby’s neck.'},
{q:'Épaule',a:['shoulder','shoulders'],w:'shoulder.'},
{q:'Bras',a:['arm','arms'],w:'arm. Raise your arm.'},
{q:'Main',a:['hand','hands'],w:'hand. Hold my hand.'},
{q:'Doigt',a:['finger','fingers'],w:'finger. Le pouce se dit thumb.'},
{q:'Genou',a:['knee','knees'],w:'knee : le k ne se prononce pas (/niː/).'},
{q:'Pied',a:['foot','feet'],w:'foot au singulier, feet au pluriel (pluriel irrégulier).'},
{q:'Dos',a:['back'],w:'back. I wash his back.'},
{q:'Ventre',a:['belly','stomach','tummy'],w:'belly (ou tummy / stomach). Her belly hurts.'},
{q:'Dents',a:['teeth'],w:'teeth : pluriel irrégulier de tooth (une dent).'},
{q:'Cheville',a:['ankle','ankles'],w:'ankle. Her ankle is swollen.'}]},
{t:'2 · Complète la phrase',i:'Choisis le bon mot du corps (l’indice français est entre parenthèses).',k:'f',items:[
{q:'Open your ___, please. (bouche)',a:['mouth'],w:'Open your mouth, please.'},
{q:'Blow your ___. (nez)',a:['nose'],w:'Blow your nose.'},
{q:'I wash the baby’s ___ with warm water. (pieds)',a:['feet'],w:'feet : pluriel irrégulier de foot.'},
{q:'Put the thermometer under your ___. (aisselle)',a:['armpit'],w:'armpit = aisselle (arm + pit).'},
{q:'Bend your ___, please. (genou)',a:['knee'],w:'Bend your knee.'},
{q:'She has a sore ___. (gorge)',a:['throat'],w:'a sore throat = un mal de gorge.'},
{q:'I check his pulse at the ___. (poignet)',a:['wrist'],w:'wrist = poignet. On prend le pouls au poignet.'},
{q:'The baby has ten little ___. (orteils)',a:['toes'],w:'toes = orteils. Les doigts de pied : toes ; les doigts de la main : fingers.'},
{q:'I cut the baby’s ___. (ongles)',a:['nails','nail'],w:'nails = ongles.'},
{q:'He wears a hearing aid in his ___. (oreille)',a:['ear'],w:'hearing aid = appareil auditif ; ear = oreille.'},
{q:'The ___ pumps the blood. (cœur)',a:['heart'],w:'The heart pumps the blood.'},
{q:'We breathe with our ___. (poumons)',a:['lungs'],w:'lungs = poumons (toujours au pluriel).'}]},
{t:'3 · Les organes : à quoi servent-ils ?',i:'Choisis la bonne réponse. La correction t’explique le rôle de chaque organe.',k:'c',items:[
{q:'Which organ pumps the blood?',o:['The heart','The lungs','The liver'],a:0,w:'The heart pumps the blood (le cœur).'},
{q:'We breathe with our…',o:['kidneys','lungs','intestines'],a:1,w:'lungs = poumons.'},
{q:'Which organ controls the body and helps us think?',o:['The brain','The stomach','The bladder'],a:0,w:'The brain = le cerveau.'},
{q:'Food goes first to the…',o:['bladder','kidneys','stomach'],a:2,w:'The stomach digests the food ; les intestins continuent la digestion.'},
{q:'Which organ holds the urine?',o:['The kidneys','The bladder','The liver'],a:1,w:'The bladder = la vessie. Les kidneys (reins) fabriquent l’urine.'},
{q:'Which organs filter the blood and make urine?',o:['The lungs','The ribs','The kidneys'],a:2,w:'The kidneys = les reins.'},
{q:'What protects the heart and the lungs?',o:['The ribs','The skull','The spine'],a:0,w:'The ribs = les côtes. Le skull (crâne) protège le cerveau.'},
{q:'What holds the body up (the backbone)?',o:['The pelvis','The spine','The femur'],a:1,w:'The spine = la colonne vertébrale.'},
{q:'What protects the brain?',o:['The skull','The ribs','The knee'],a:0,w:'The skull = le crâne.'},
{q:'Which organ cleans the blood?',o:['The liver','The bladder','The heart'],a:0,w:'The liver = le foie.'}]},
{t:'4 · Où ça fait mal ?',i:'Choisis la bonne phrase en anglais.',k:'c',items:[
{q:'« J’ai mal à la tête. »',o:['I have a headache.','I have a stomach ache.','I have a sore throat.'],a:0,w:'headache = mal de tête (head + ache).'},
{q:'« Il a mal aux dents. »',o:['He has an earache.','He has a toothache.','He has a backache.'],a:1,w:'toothache = mal de dents.'},
{q:'« Elle a mal à la gorge. »',o:['She has a sore throat.','She has a headache.','She has a toothache.'],a:0,w:'a sore throat = mal de gorge.'},
{q:'« Le bébé a mal à l’oreille. »',o:['The baby has a stomach ache.','The baby has an earache.','The baby has a headache.'],a:1,w:'earache : on dit an earache (devant une voyelle).'},
{q:'« J’ai mal au dos. »',o:['My back hurts.','My back is hurting to me.','I am back pain.'],a:0,w:'My back hurts (ou I have a backache).'},
{q:'« Où avez-vous mal ? »',o:['Where does it hurt?','What is your pain?','Who hurts you?'],a:0,w:'Where does it hurt? Réponse : It hurts here.'},
{q:'« A-t-il de la douleur ? »',o:['Does he have any pain?','Is he pain?','Has he a pained?'],a:0,w:'Does he have any pain? (pain = douleur).'}]},
{t:'5 · Quelle phrase dire au patient ?',i:'Situation de soin : choisis la phrase la plus utile et la plus polie.',k:'c',items:[
{q:'Tu veux que le patient ouvre la bouche.',o:['Please open your mouth.','Close the mouth now.','Mouth opening, please you.'],a:0,w:'On utilise l’impératif poli : Please + verbe.'},
{q:'Tu veux qu’il lève le bras.',o:['Raise your arm, please.','Rise the arm up.','Lift arm.'],a:0,w:'Raise (ou lift) your arm : my / your devant la partie du corps.'},
{q:'Tu veux qu’il respire profondément.',o:['Breathe in… and breathe out.','Breath in and breath out.','Take a respiration.'],a:0,w:'Le verbe est breathe (avec e) ; le nom est breath.'},
{q:'Tu veux qu’il te serre la main s’il a mal.',o:['Squeeze my hand if it hurts.','Press the hand of mine.','Make pain to my hand.'],a:0,w:'Squeeze my hand = serrez-moi la main.'},
{q:'Tu annonces la toilette du dos.',o:['I will wash your back now.','I wash back.','Your back is washing.'],a:0,w:'Annoncer chaque geste rassure le patient.'},
{q:'Tu demandes la permission avant de le toucher.',o:['May I touch your arm?','I touch your arm.','Touch arm, OK?'],a:0,w:'May I… ? est une demande polie.'},
{q:'Tu veux savoir si l’eau est trop chaude.',o:['Is the water too hot?','Water is hot or not?','How is the hot water to you?'],a:0,w:'too hot = trop chaud.'}]},
{t:'6 · Parle toi-même',i:'Réponds avec tes mots (même simples). Puis compare avec la réponse modèle.',k:'s',items:[
{q:'Name the parts of the face in English.',s:'The face has two eyes, one nose, one mouth, two ears and two cheeks. Above the eyes there are the eyebrows and the forehead. Below the mouth there is the chin.'},
{q:'You help a patient with his bath. Say where you will wash him.',s:'I will wash your face, your arms, your hands, your back and your feet. Tell me if the water is too hot.'},
{q:'A patient says “It hurts here.” What do you ask?',s:'Where does it hurt? Is it your head, your back or your stomach? Does it hurt a lot? I will call the nurse.'}]}
];
/* ---- mini-jeux du module 2 ---- */
VF[2]=[['The plural of “foot” is “foots”.',0,'Pluriel irrégulier : one foot, two feet.'],['“Teeth” is the plural of “tooth”.',1,'One tooth, two teeth.'],['The kidneys pump the blood.',0,'Le cœur (heart) pompe le sang ; les reins (kidneys) filtrent le sang.'],['The spine is in the back.',1,'La colonne vertébrale se trouve dans le dos.'],['You can put a thermometer under the armpit.',1,'Armpit = aisselle.'],['“I have a headache” means « J’ai mal à la tête ».',1,'Head + ache.'],['In “knee”, we pronounce the k.',0,'Le k est muet : /niː/.'],['“Where does it hurt?” asks about pain.',1,'Question typique du soignant.'],['The lungs are in the belly.',0,'Les poumons sont dans la poitrine (chest).'],['We say “my head” and not “the head” when we talk about our body.',1,'On utilise my / your / his / her.']];
MT[2]=[['Elbow','Coude'],['Wrist','Poignet'],['Ankle','Cheville'],['Calf','Mollet'],['Thigh','Cuisse'],['Kidneys','Reins'],['Windpipe','Trachée'],['Navel','Nombril']];
OR[2]=['Du haut vers le bas : range les parties du corps de la tête aux pieds',['Head','Neck','Shoulder','Chest','Belly','Hip','Thigh','Knee','Ankle','Foot']];
CL[2]={t:'Externe ou interne ?',c:['Externe (on le voit)','Interne (dans le corps)'],i:[['Nose',0,'Le nez se voit sur le visage.'],['Heart',1,'Le cœur est dans la poitrine.'],['Elbow',0,'Le coude est une articulation visible.'],['Lungs',1,'Les poumons sont dans la poitrine.'],['Heel',0,'Le talon est à l’arrière du pied.'],['Liver',1,'Le foie est dans le ventre.'],['Chin',0,'Le menton est sur le visage.'],['Brain',1,'Le cerveau est dans la tête.'],['Kidneys',1,'Les reins sont dans le bas du dos.'],['Wrist',0,'Le poignet relie la main au bras.'],['Stomach (organ)',1,'L’estomac est dans le ventre.'],['Eyebrow',0,'Le sourcil est au-dessus de l’œil.']]};
/* ---- quiz supplémentaires du module 2 ---- */
[Q('Traduction','« Cheville » se dit…',['ankle','elbow','wrist'],0,'Ankle = cheville ; elbow = coude ; wrist = poignet.'),
Q('Grammaire','Pluriel de « foot » :',['foots','feet','feets'],1,'Pluriel irrégulier : feet. Même logique : tooth → teeth.'),
Q('Mise en situation','Où mets-tu le thermomètre ?',['under the armpit','in the elbow','on the heel'],0,'Under the armpit = sous l’aisselle.'),
Q('Traduction','« Mal de dents » se dit…',['headache','toothache','backache'],1,'Tooth + ache = toothache.'),
Q('Organes','Quel organe pompe le sang ?',['The heart','The brain','The bladder'],0,'The heart pumps the blood.'),
Q('Organes','Les « kidneys » sont…',['les poumons','les reins','les intestins'],1,'Kidneys = reins ; lungs = poumons ; intestines = intestins.'),
Q('Mise en situation','Le patient a mal. Que demandes-tu ?',['Where does it hurt?','How old are you?','What is your name?'],0,'Where does it hurt? puis : Does it hurt a lot?'),
Q('Consigne','« Squeeze my hand » signifie…',['Serrez-moi la main','Lavez-vous les mains','Levez la main'],0,'Squeeze = serrer.'),
Q('Traduction','Les « ribs » protègent…',['le cœur et les poumons','le cerveau','les reins seulement'],0,'Ribs = côtes ; skull = crâne (protège le cerveau).'),
Q('Grammaire','Phrase correcte :',['I wash the baby’s feet.','I wash baby feets.','I wash the feet of baby’s.'],0,'On utilise ’s pour le possesseur : the baby’s feet.'),
Q('Consigne','Pour dire « Respirez profondément » :',['Breathe in and breathe out.','Breath in, breath out.','Take respiration.'],0,'Breathe (verbe, avec e) ≠ breath (nom).'),
Q('Traduction','« Poignet » se dit…',['wrist','ankle','elbow'],0,'On prend le pouls au poignet : the wrist.')].forEach(q=>QZ[2].push(q));
OBJ[2]=[['Nommer les parties du corps en anglais','corps'],['Retrouver l’essentiel du cours dans la fiche « Cours »','fiche'],['Utiliser les verbes d’action des soins','mots'],['S’entraîner avec des exercices corrigés','exo'],['Jouer pour mémoriser','jeux2'],['Vérifier mes acquis','jeux']];
