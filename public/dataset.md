# Chatmilo

Chatmilo est un bot pour simplifier l'usage de l'intranet de l'IUT
par un contrôle vocale ou textuel en langage naturel.

Le bot peut utiliser les commandes suivantes

- openADE: Ouvre l'agenda
- askClass Demande quel cours ouvrir
- openClass: Ouvre la page dédiée à un cours
- openNotes: Pour consulter le buletin de notes
- openZimbra: Pour lire les mails
- help: Présente le bot et détaille les fonctionnalités précédentes
- unknown: Quand le bot ignore la réponse à une question
- LUS: Action standard de Wisty.js pour rendre la parole à l'utilisateur

The bot talks in french to the user, and the user too.

## wisty.stories

### Open agenda

> ouvre l'ade
- openADE

### Open agenda 2

> fait moi voir mon agenda stp
- openADE

### Open agenda 3

> salut
- help

> on a quoi comme cours ?
- openADE

### Open agenda 4

> ouvre l'emploi du temps
- openADE

### Open agenda 5

> tu peut ouvrir mon edt stp
- openADE

### Open agenda 6

> ya quoi dans l'emploi du temps aujourd'hui ?
- openADE

### Open agenda 7

> bonjour
- help

> ouvre mon agenda
- openADE

### Open agenda 8

> ouvre moi ADE
- openADE

### Open agenda 9

> agenda
- openADE

### Open agenda 10

> EDT
- openADE

### Open zimbra

> ouvre mes mails
- openZimbra

### Open zimbra 2

> fait voir les derniers mail ?
- openZimbra

### Open zimbra 3

> hey
- help

> ouvre Zimbra
- openZimbra

### Open zimbra 4

> lance mes mails
- openZimbra

### Open zimbra 5

> ouvre ma messagerie
- openZimbra

### Open zimbra 6

> fait voir le dernier mail de laurillau
- openZimbra

### Open zimbra 7

> webmail
- openZimbra

### Open zimbra 8

> ouvre mon adresse mail
- openZimbra

### Open zimbra 9

> ouvre ma boite mail
- openZimbra

### Open zimbra 10

> e-mail
- openZimbra

### Open class

> fait voir mon cours de réseau
- openClass

### Open class 2

> ouvre le module de c++
- openClass

### Open class 4

> m3103
- openClass

### Open class 5

> hello
- help

> est-ce que tu peut ouvrir le module qui parle de système d'exploitation ?
- openClass

### Open class 6

> ouvre les stats
- openClass

### Open class 7

> ouvre le cours de maths
- openClass

### Open class not named

> ouvre le cours
- askClass

> M3301
- openClass

### Open class not named 2

> ouvre mon tp
- askClass

> le tp de probas
- openClass

### Open class not named 3

> coucou
- help

> tu peut ouvrir le cours stp
- askClass

> de droit
- openClass

### Open class not named 4

> ouvre le cours
- askClass

> bah le cours
- askClass

> le cours...
- unknown

### Open class not named 5

> hola
- help

> ouvre le module
- askClass

> le module
- askClass

> de stats
- openClass

### Open class canceled

> ouvre le module
- askClass

> annuler
- help

> ouvre mes mails
- openZimbra

### Open class canceled 2

> tu peut ouvrir un cours pls
- askClass

> nan laisse tomber
- help

> ta vu le dernier message de pesty ?
- openZimbra

### Open notes

> ouvre mes notes
- openNotes

### Open notes 1

> fait voir ma dernière note stp
- openNotes

### Open notes 2

> yo ta vu les notes de droit stp
- openNotes

### Open notes 3

> nan je voulais que tu ouvre mes notes
- openNotes

### Open notes 4

> ouvre mon bulletin de note
- openNotes

### Open notes 5

> note
- openNotes

### Open notes 6

> bulletin
- openNotes

### unknown

> donne moi la météo
- unknown

### unknown 2

> ouvre rien connard
- unknown

### unknown 3

> donne moi l'heure
- unknown

### unknown 4

> prépare moi un café
- unknown

> d'accord !
- unknown

> oui oui donne moi plutôt ma dernière note
- openNotes

### unknown 5

> choucroute
- unknown

> ok
- unknown

> ok ouvre un cours
- askClass

> celui ou la prof de ppp s'occupe de nous
- openClass

### unknown 6

> hey
- help

> ok
- unknown

> d'accord
- unknown

> oui
- unknown

### introduce

> wesh t'es qui ?
- help

### introduce 2

> ouvre le cours
- askClass

> je sais pas
- help

> donne moi les notes du contrôle de maths
- openNotes
