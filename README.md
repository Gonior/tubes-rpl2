# Tubes RPL-2 QUEUE APPS

| NIM      | Name             |
| -------- | ---------------- |
| 10118901 | Dedi Cahya       |
| 10118902 | Agung Sepruloh   |
| 10118904 | Firman Alfinas   |
| 10118910 | M. Syifa Amruloh |

## Link
- client : [here](https://queue-apps.vercel.app)
- server : [here](https://api-queue-apps.herokuapp.com)
- Admin Page (client) can access in `(https://queue-apps.vercel.app/authadmin` call me on Whatsapp if you want username and password
- Admin Puskesmas Page (client) can access in `https://queue-apps.vercel.app/auth`, and then enter Puskesmas Kode. (You can see Puskesmas Kode after login in Admin Page)
## Requirement

- Node js version 12 above
- git CLI
- CMD / POWERSHELL / TERMINAL

Choose directory what you want example `D:/perkuliahan/` and type on CMD / Terminal code below :

```bash
git clone https://github.com/Gonior/tubes-rpl2.git
cd tubes-rpl2
```

## Choose what you want to edit

```bash
cd server // to edit server
```

or

```bash
cd client // to edit client
```

## Install Dependencies

```bash
npm i // yarn (if you using yarn)
```

## Test Drive

```bash
npm run dev
```

or

```bash
yarn dev
```

## MongoDB Connection

To connect to your MongoDB database, you need to setup the MONGO_URI environment variable first.
Example:

```bash
export MONGO_URI='<your_mongodb_uri>'
```
