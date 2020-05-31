import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import fetch from "cross-fetch";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

const requestOptions = {
  method: "GET",
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "omit", // include, *same-origin, omit
  redirect: "follow" // manual, *follow, error
};
function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
const def = ["test", "test3"];
const AsyncAutoComplete = () => {
  const [open, setOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    console.log("use", text, "options", cards);
    let active = true;
    console.log("use", text, "options", cards);

    if (!loading || text.length < 3) {
      return undefined;
    }

    const fullURI = new URL(
      `https://api.scryfall.com/cards/autocomplete?q=${text}`
    );
    (async () => {
      const cards = fetch(fullURI, requestOptions)
        .then(response => {
          if (!response.ok) {
            const error = `Unexpected response: ${response.status}: ${response.statusText}`;
            console.error("error", error, "status", response.status);
            return Promise.reject(error);
          }
          const contentType = response.headers.get("Content-Type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("expected JSON response");
          }
          return response.json();
        })
        .then(data => {
          console.log("setting au list", JSON.stringify(data));
          return data;
        })
        .catch(error => {
          console.error("Error:", error);
          return { data: def };
        });

      await sleep(1e3); // For demo purposes.
      if (active) {
        setCards(cards);
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    console.log("use other", text, "options", cards);
    if (!open) {
      setCards([]);
    }
    console.log("use other close", text, "options", cards);
  }, [open]);

  return (
    <Autocomplete
      id="card search"
      freeSolo
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={option => option}
      options={cards}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Card Search"
          variant="outlined"
          onChange={e => setLoading(true) && setText(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};
export default AsyncAutoComplete;
