# BF Employee HR Project

## Setup

Copy the pre-commit hook to the .git/hooks directory to enable
automatic code formatting before each commit.

```bash
cp pre-commit .git/hooks/
chmod +x .git/hooks/pre-commit
```

## Development

Run `npm install` in root directory first.

### Server

```bash
cd Server
npm install
npm run dev
```

### Employee Client

```bash
cd Employee-Client
npm install
npm run dev
```

### HR Client

```bash
cd HR-Client
npm install
npm run start or ng serve
```

### `useFetch` hook

```js
const { data, isLoading, error, isFetched } = useFetch(url, options);
```
- `url` - the URL to fetch data from
- `options` - an object containing options for the fetch request
  - `method` - the HTTP method to use (default: `GET`)
  - `headers` - an object containing headers to send with the request
  - `body` - the body of the request (default: `null`), auotmatically converted to JSON
  
Example:
```js
import { useFetch } from "./utils";

const { data, isLoading, error, isFetched } = useFetch("/api/user", {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`},
  body: { username, password },
});
```
