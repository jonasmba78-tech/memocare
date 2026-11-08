/* === DONNÉES · Cours 1 « English for Care » : MO (modules/sections) et CB (BD / dialogues) des modules 1-3 === */
const MO={
1:{t:"1 · Saluer",S:{plan:"Parcours",bd:"BD",jour:"Salutations",eq:"Équipe"},story:"À l’hôpital de Yaoundé, <b>Mary</b>, <b>care assistant</b>, dit <b>Good morning</b> à M. Njoya. L’<b>nurse</b> donne les traitements, le <b>doctor</b> consulte, la <b>midwife</b> suit les grossesses. Suis le soleil pour savoir quand dire quoi."},
2:{t:"2 · Corps & soins",S:{plan:"Parcours",bd:"BD",corps:"Corps 3D",mots:"Verbes & matériel"},story:"Le matin chez M. Enock : <b>get up</b> → <b>hold my hand</b> → <b>feet on the floor</b> → <b>stand up</b> → <b>walker</b> → <b>bathroom</b>. Rejoue la BD, puis touche le corps en 3D."},
3:{t:"3 · Routines",S:{plan:"Parcours",bd:"BD",rout:"Routines",mots:"Vocabulaire",gram:"Grammaire"},story:"Une journée type : <b>wake up</b> → <b>get dressed</b> → <b>have breakfast</b> → <b>go for a walk</b> → <b>have lunch</b> → <b>go to bed</b>. Au <b>présent simple</b>, he/she/it prend un <b>-s</b>."}};
const CB={1:[
{t:"A · Accueil à l’hôpital de Yaoundé",c:[["🧑🏾‍⚕️","Mary"],["👴🏾","Mr. Njoya"]],p:[
[0,"Good morning, Mr. Njoya. I am Mary. I am your care assistant.","Bonjour M. Njoya, je suis Mary, votre auxiliaire de vie.","👋🏾"],
[1,"Good morning, Mary. Nice to meet you.","Bonjour Mary. Enchanté.","🤝🏾"],
[0,"Nice to meet you too. How are you feeling today?","Enchantée aussi. Comment vous sentez-vous ?","❓"],
[1,"I’m a little tired.","Je suis un peu fatigué.","😮‍💨"],
[0,"Don’t worry. I’m here to help you. I will take you to your room.","Ne vous inquiétez pas. Je suis là pour vous aider. Je vous emmène à votre chambre.","🏥"]]},
{t:"B · La crèche de Douala",c:[["🧑🏾‍🍼","Sarah"],["👩🏾","Mother"]],p:[
[0,"Good morning, Madam. Welcome to our nursery.","Bonjour Madame. Bienvenue dans notre crèche.","🏠"],
[1,"Good morning. This is my baby, Kevin.","Bonjour. Voici mon bébé, Kevin.","👶🏾"],
[0,"Nice to meet you, Kevin. I’m Sarah. I will take care of him today.","Enchantée, Kevin. Je suis Sarah. Je m’occuperai de lui aujourd’hui.","🤲🏾"],
[1,"Thank you. He is a little fussy this morning.","Merci. Il est un peu grognon ce matin.","😫"],
[0,"Don’t worry. We’ll take good care of him.","Ne vous inquiétez pas. Nous prendrons bien soin de lui.","💛"]]},
{t:"C · Le centre de Bafoussam",c:[["🧑🏾‍🏫","David"],["👩🏾","Mother"]],p:[
[0,"Hello! I’m David. I’m your special educator.","Bonjour ! Je suis David, votre éducateur spécialisé.","👋🏾"],
[1,"Hello. (l’enfant)","Bonjour. (l’enfant)","🧒🏾"],
[0,"Welcome to our centre. We’re very happy to have you.","Bienvenue dans notre centre. Nous sommes ravis de vous accueillir.","🎉"],
[1,"Thank you. He is a bit nervous.","Merci. Il est un peu nerveux.","😟"],
[0,"That’s normal. We’ll take it slowly. I will help him with his exercises.","C’est normal. Nous irons doucement. Je l’aiderai avec ses exercices.","🐢"]]}],
2:[
{t:"A · Se lever avec le déambulateur",c:[["🧑🏾‍⚕️","Care assistant"],["👴🏾","Mr. Enock"]],p:[
[0,"Good morning, Mr. Enock. Let me help you get up.","Bonjour M. Enock. Laissez-moi vous aider à vous lever.","🛏️"],
[0,"Hold my hand. Put your feet on the floor.","Tenez ma main. Posez vos pieds au sol.","🤝🏾🦶🏾"],
[0,"One, two, three, now stand up!","Un, deux, trois, debout !","🧍🏾"],
[0,"Good. Now please take your walker.","Bien. Prenez maintenant votre déambulateur.","🚶🏾"],
[0,"We’ll go to the bathroom.","Nous allons à la salle de bain.","🚿"]]},
{t:"B · Coucher le bébé",c:[["🧑🏾‍🍼","Childcare assistant"],["👶🏾","Baby"]],p:[
[0,"Hello, little one. Let’s go to your cot.","Bonjour petit. Allons à ton lit.","🛏️"],
[0,"I’m going to carry you. There you go.","Je vais te porter. Voilà.","🤲🏾"],
[0,"Lie down. Sleep well.","Allonge-toi. Dors bien.","😴"]]},
{t:"C · Installer Sam dans son fauteuil",c:[["🧑🏾‍🏫","Special educator"],["🧒🏾","Sam"]],p:[
[0,"Sam, let’s sit in your wheelchair. I’ll help you.","Sam, installons-toi dans ton fauteuil roulant. Je vais t’aider.","♿"],
[0,"Put your arm here. Good. Now your leg. Perfect.","Mets ton bras ici. Bien. Maintenant ta jambe. Parfait.","💪🏾🦵🏾"],
[0,"Are you comfortable?","Es-tu bien installé ?","😊"]]}]};
CB[3]=[
{t:"A · Aider une personne âgée à se laver",c:[["🧑🏾‍⚕️","Care assistant"],["👵🏾","Patient"]],p:[
[0,"Let’s go to the bathroom.","Allons à la salle de bain.","🚿"],[0,"I’ll help you wash your face.","Je vais vous aider à laver votre visage.","🧼"],[0,"Now your arms. Good. Now your legs.","Maintenant vos bras. Bien. Maintenant vos jambes.","💪🏾🦵🏾"],[0,"Well done. You are very clean now.","Bravo. Vous êtes tout propre maintenant.","✨"]]},
{t:"B · Changer la couche d’un bébé",c:[["🧑🏾‍🍼","Childcare assistant"],["👶🏾","Baby"]],p:[
[0,"Time to change your nappy. Lie down on the changing table.","C’est l’heure de changer ta couche. Allonge-toi sur la table à langer.","🧷"],[0,"I’m going to clean you. Don’t move, little one.","Je vais te nettoyer. Ne bouge pas, petit.","🧻"],[0,"There you go, all clean. Now a new nappy. Perfect!","Voilà, tout propre. Maintenant une couche neuve. Parfait !","😊"]]},
{t:"C · Aider un enfant à s’habiller",c:[["🧑🏾‍🏫","Special educator"],["🧒🏾","Child"]],p:[
[0,"Let’s get dressed. First, put on your shirt.","Habillons-nous. D’abord, mets ta chemise.","👕"],[0,"Raise your arms. Good.","Lève les bras. Bien.","🙌🏾"],[0,"Now your trousers. Put one leg in, then the other.","Maintenant ton pantalon. Une jambe, puis l’autre.","👖"],[0,"Now your shoes. Good job!","Maintenant tes chaussures. Bravo !","👟"]]}];
