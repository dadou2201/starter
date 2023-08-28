'use strict';

//slice: prend d une position a une autre(non comprise)
//splice: supprime les elements exemple arr=a,b,c,d,e -> arr.splice(-1) -> arr = a,b,c,d
//reverse: inverse le tableau mais change aussi (il mute)
//concat: reunis 2 tableaux et le mute exemple : arr.concat(arr2) les 2 tableaux seront en 1
//le concat peut etre ecrit aussi avec spread qu on a appris exp: [...arr,...arr2]
//join : on a arr=a,b,c,d,e on fait arr.join('-') ca donnera a-b-c-d-e sans le tableau
// at : c'est comme dire arr[0] sauf que ca peut etre plus utile par exemple pr prendre
//      le dernier element avant on faisait arr[arr.length-1] la on fait arr.at(-1)

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//LES mouvement du site entree et sortie de soux:
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // on va creer une copie du tableau mouvements avec slice pour ensuite trier comme on veut
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//on veut que ca retourne les initiales du nom de l useur
const user = 'Steven Thomas William'; //stw
const userName = user
  .toLowerCase()
  .split(' ')
  .map(name => name[0])
  .join('');

// transformer en fonction ca donne ca :
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

const updateUI = function (acc) {
  //ETAPE 3 : display movements
  displayMovements(acc.movements);
  //ETAPE 4 : display balance
  calcPrintBalance(acc);
  //ETAPE 5 : display summary
  calcDisplaySummary(acc);
};

//Event Handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting en gros ca va pas soumettre direct quand on click
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  //le ? dans le if est que ca va etre lu que si cureentAccount existe cad correspond a qqun
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //si ca rentre la c est que le pin et le username est bon donc on veut afficher un msg et le reste
    //ETAPE 1: changer le message en haut log in to get started en welcome ...
    labelWelcome.textContent = `Welcome nack , ${
      currentAccount.owner.split(' ')[0]
    }`;
    //on a remis dans le css l opacity a 0 et la si c est bon on veut reafficher le contenu
    containerApp.style.opacity = 100;
    //ETAPE 2 : retirer les champs input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur(); //sert a enlever le focus sur le pin que c est pas selectionner en gros
    //appel de la fonction qui appel les etapes restantes necessaires:
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// LOOP normal
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposit ${movement} dollars`);
//   } else {
//     console.log(`You retire ${Math.abs(movement)} dollars`);
//   }
// }

//LOOP forEach on peut mettre dans la parenthese que movement mais aussi l index et le array
//      toujours dans la meme position !!

// la difference entre forEach et une boucle c est que forEach n a pas de stop donc il fait tout le tableau
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposit ${movement} dollars`);
  } else {
    console.log(
      `Movement ${index + 1}: You retire ${Math.abs(movement)} dollars`
    );
  }
});

//forEach sur les map (key,value)
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//ici aussi l ordre est important dans la parenthese : 1.value , 2.key , 3.map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//forEach sur les set(valeur unique expl: dollar,euro,euro,dollar ca donnera euro et dollar)
// ici aussi l ordre est important dans la parenthese : 1.value , 2._ , 3.map
// comme un set n a pas d index ni de key on met _ qui veut dire inutile pour garder
// la meme signature de 3 elements dans la parenthese et pas creer de confusions
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

//Filter : exemple prendre que les montant deposer a la banque
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

//fonction reduce : dans la parenthese de la fonction il y a 4 elements : 1-le cumulateur,
// 2- la valeur actuelle 3-la position 4- le tableau
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0); // valeur de depart de la fonction
console.log(balance);
// la meme fonction avec fonction arrow
const balanceArrow = movements.reduce((acc2, cur2) => acc2 + cur2, 0);
console.log(balanceArrow);

// Du coup pour afficher notre balance sur l application de la banque on fait :
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((accP, curP) => accP + curP, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

//Maximum value :
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

// On a 2 tableaux d age de chien on veut dire que si l age du chien est inferieur ou egal
// a 2 alors l age humain est 2x l age si c est plus l age humain est 16 + 4x l age ,ensuite
// on veut garder dans le tableau que les age superieur a 18 et ensuite faire la moyenne de
// l age des ages adulte donc on fait :
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + 4 * age));
  const adult = humanAges.filter(age => age >= 18);
  const average = adult.reduce((acc, age) => age + acc, 0) / adult.length;
  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

//Imaginons que nous voulions transformer le depot totat en dollar on devra donc garder les
// depots seulement puis convertir en dollar puis faire le totat donc on utilise 3 trucs:
const euroToUSD = 1.1;
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUSD)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);

// retour sur l exo de la banque on veut calculet le summary:
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // le 2em filter en dessous sert a exclure un montant en dessous de 1 ca ajoute un filtre
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((inter, i, arr) => {
      return inter >= 1;
    })
    .reduce((acc, inter) => acc + inter, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//FindvsFilter : find renvoi la premiere valeur de la condition et sous forme normal tandis
// que filter renvoi tous les valeurs de la conditions sous forme de tableau
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

// transferer les soux :
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAc &&
    currentAccount.balance >= amount &&
    receiverAc?.userName !== currentAccount.userName
  ) {
    //le transfert!
    currentAccount.movements.push(-amount);
    receiverAc.movements.push(amount);
    updateUI(currentAccount);
  }
});

//pret a la banque :
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amountLoan = Number(inputLoanAmount.value);

  if (
    amountLoan > 0 &&
    currentAccount.movements.some(mov => mov >= amountLoan * 0.1)
  ) {
    //si le pret est ok on l ajoute et on update le ui
    currentAccount.movements.push(amountLoan);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//fermeture de compte
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    accounts.splice(index, 1);
    //re enlever apres la suppression du compte l interface
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin = '';
});

//ce qui va faire marcher tout le temps le bouton sorted des mouvement !
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//la methode SOME sert a renvoyer true ou false comme pour includes sauf que la tu peux
// ajoute une condition contrairment a includes qui check un truc : movements.includes(-130)

const anyDepostis = movements.some(mov => mov > 0);

//la methode EVERMY (cousine a some):elle renvoie TRUE que si toutes les valeurs sont ok
//exemple le compte 4 contient que ds depots donc que des + donc avc every ca va rendre true

console.log(account4.movements.every(mov => mov > 0));

//la methode flat permet de sortir un array d un arret ,ex:arr=[[1,2,3],[4,5,6],7,8] ca
// donnera un tableau arr=[1,2,3,4,5,6,7,8] grace a flat ou l on peut ajouter la profondeur
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8]; // ya un tab dans un tab qui est ds un tab
console.log(arrDeep.flat(2)); // le 2 en parenthese c est profondeur 2 car tab ds tab ds tab

// pour l app dla banque imaginons que nous voulions calculer la balance totale alors l idee
// serait de prendre tt les valeurs et les mettre dans des tablu et ensuite aditioner le tt
const accountMovements = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(accountMovements);

// pour trier les chiffres dans un tableau du petit au grand on fait :
// return 1 keep order , return -1 switch
// pour trier les chiffres dans un tableau du grand au petit on inverse -1 et 1 en dessous
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
//moyen encore plus rapide :
movements.sort((a, b) => a - b); // pour petit a grand si on veut grand a petit on fait b-a

// remplir un tableau avec la methode fill :
const x = new Array(7); // creer un tableau vide de taille 7
//x.fill(1); // rempli le tableau de 1
//x.fill(1, 3); // rempli le tableau de 1 a partir de l index 3
x.fill(1, 3, 5); // rempli le tableau de 1 a partir de l index 3 a 5 non inclu

//creer un tableau avec Array.from:
const y = Array.from({ length: 7 }, () => 1); // creer un tableau de taille 7 remplis de 1
const z = Array.from({ length: 7 }, (_, i) => i + 1); //tableau de taille 7 qui a 1,2,3,4,5,6,7
//rappel le _ dans la parenthese en haut c est pour dire que la variable est inutile

//creer un array de 100 avec des random de 1 a 6
const de100 = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);

console.log(de100);

/*imaginons que dans notre application bankist nous avons pas la possibilite de recuperer 
depuis le tableau mouvements les entree et sorties d argent alors on peut les recuperer
la page internet si elles sont affiches et ensuite les mettre dans un tableau:*/

labelBalance.addEventListener('click', function () {
  const mouvementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(mouvementsUI);
});
