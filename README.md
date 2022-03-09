## Quick run

```bash
git clone git@gitlab.com:takiacademy-alternance/frontend-team/reactjs-bac/test-3-bac.git test-3-bac
cd test-3-bac/
git checkout -b test3/firstname-lastname
git push
npm install
npm start
```

## Development tricks

Use nanoid to generate ids

```bash
import { nanoid } from "nanoid";
console.log(nanoid(10)); --> qa1gAk2WpZ
```

Sidebar links example

```bash
import { Link } from "react-router-dom";
<Link to="/all-files">All Files</Link>
```