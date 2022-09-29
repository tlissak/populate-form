# populate-form
populate-form by json object
usage

```
var json_object = {
  id:"1"
  title:"somthing"
  country:"fr"
}
document.addEventListener("DOMContentLoaded", function() {
  populate_form('#my-form',json_object)
});
```

```
<form id='my-form'>
    <input type="text" name="id">
    <input type="text" name="title">
    <select name="country">
      <option value="us">USA</option>
      <option value="fr">FRANCE</option>
  </select>
  </form>
  ```
