const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// A cookie-parser middleware beállítása
app.use(cookieParser());

// Példa API végpont, amely lekéri a cookie-kat
app.get('/api/user', (req, res) => {
  // Lekérjük a cookie-t (pl. "userSession")
  const userSession = req.cookies['userSession'];
  
  if (userSession) {
    res.send(`A cookie értéke: ${userSession}`);
  } else {
    res.status(400).send('Nincs bejelentkezve!');
  }
});









app.post('/api/login', (req, res) => {
  // A cookie beállítása
  res.cookie('userSession', 'egyedi_token_itt', {
    httpOnly: true,        // Nem elérhető JavaScript-ből
    secure: process.env.NODE_ENV === 'production', // Csak HTTPS-en
    maxAge: 3600000        // 1 óra érvényesség
  });

  res.send('Sikeres bejelentkezés');
});











app.post('/api/logout', (req, res) => {
  // A cookie törlése
  res.clearCookie('userSession');
  res.send('Sikeres kilépés');
});












app.post('/api/update', (req, res) => {
  // Felhasználói adat frissítése (pl. user ID vagy egyéb adatok)
  const userId = req.body.userId;

  // Küldjük az adatot cookie-ban
  res.cookie('userId', userId, {
    httpOnly: true,
    maxAge: 3600000, // 1 óra
  });

  res.send('Adatok sikeresen frissítve');
});







A cookieParser.signedCookies egy speciális funkció a cookie-parser middleware-ben, amely lehetővé teszi, hogy aláírt cookie-kat kezeljünk. Az aláírás biztosítja, hogy a cookie tartalma nem manipulálható, tehát a kliens nem tudja megváltoztatni az adatokat, anélkül hogy észrevennénk.
Mi az aláírás?

Alapértelmezés szerint, amikor egy cookie-t küldesz a kliensnek, azt bárki (aki hozzáfér a böngészőhöz vagy a hálózathoz) könnyedén módosíthatja. Az aláírás a cookie tartalmát egy titkos kulcs segítségével "megszólítja", így ha a cookie értéke módosul, akkor a szerver észlelni fogja ezt.
Hogyan működik?

Amikor cookie-t küldesz a kliensnek, az aláírt cookie-kat úgy hozod létre, hogy a cookie-parser middleware-ben beállítasz egy titkos kulcsot. A titkos kulcs (amit az app.use(cookieParser(secret)) sorban adsz meg) biztosítja, hogy a cookie-k nem módosíthatóak anélkül, hogy észrevennénk.
Aláírt cookie beállítása:





const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const SECRET_KEY = 'mySecretKey';  // Titkos kulcs az aláíráshoz

app.use(cookieParser(SECRET_KEY));  // Aláírás aktiválása

// Bejelentkezés, aláírt cookie beállítása
app.post('/api/login', (req, res) => {
  const user = { id: 123, name: 'John Doe' };

  // Az aláírt cookie beállítása
  res.cookie('user', JSON.stringify(user), {
    signed: true,  // Aláírás engedélyezése
    httpOnly: true,
    maxAge: 3600000  // 1 óra
  });

  res.send('Sikeres bejelentkezés');
});





app.get('/api/user', (req, res) => {
  // Az aláírt cookie lekérése
  const user = req.signedCookies['user'];
  
  if (user) {
    res.send(`Üdvözöllek, ${JSON.parse(user).name}!`);
  } else {
    res.status(400).send('Nincs bejelentkezve!');
  }
});




Mi történik, ha valaki megpróbálja manipulálni a cookie-t?

Ha valaki megpróbálja módosítani a cookie-t (például kézzel megváltoztatja a cookie értékét), az aláírás már nem lesz érvényes. A szerver ezt észleli, és a signedCookies objektumban nem fogja megtalálni a módosított cookie-t.
Miért hasznos az aláírás?

    Adatbiztonság: Az aláírt cookie biztosítja, hogy a cookie-t tartalmazó adatokat nem lehet manipulálni a kliens oldalán.

    Hitelesítés: Segít hitelesíteni a felhasználót anélkül, hogy az adatokat a kliens oldalon tárolnád (pl. jelszó, felhasználói adatok).

    Integritás: Mivel az aláírás nem titkosítja az adatokat, hanem csak biztosítja azok épségét, az adatok továbbra is olvashatók, de nem módosíthatók.




app.post('/api/logout', (req, res) => {
  res.clearCookie('user');
  res.send('Sikeres kilépés');
});




A signedCookies egy olyan kifejezés, amely az aláírt cookie-k lekérdezésére szolgál az Express alkalmazásban. Az aláírás megakadályozza, hogy a kliens oldal módosítsa a cookie-kat, így biztosítva azok integritását és biztonságát. Aláírt cookie-kat akkor használhatsz, ha szükséged van a cookie tartalmának biztonságos kezelésére.