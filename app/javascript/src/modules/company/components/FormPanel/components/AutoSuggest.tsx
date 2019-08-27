import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

interface OptionType {
  label: string;
}

const suggestions: OptionType[] = [
  {label: 'G2 Crowd'},
  {label: 'PrepDD'},
  {label: 'Infor'},
  {label: 'NetSuite'},
  {label: 'Zendesk'},
];

function renderInputComponent(inputProps: any) {
  const {classes, inputRef = () => {}, ref, ...other} = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(
  suggestion: OptionType,
  {query, isHighlighted}: Autosuggest.RenderSuggestionParams
) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{fontWeight: part.highlight ? 500 : 400}}
          >
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value: string) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion: OptionType) {
  return suggestion.label;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 250,
      flexGrow: 1,
    },
    container: {
      position: 'relative',
      '& label': {
        color: '#606060',
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: '12px',
      },
      '& input': {
        color: '#000000',
        font: 'inherit',
        fontWeight: 600,
      },
      '&:selected': {
        color: '#3A84FF',
      },
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0,
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
  })
);

interface IntegrationAutosuggestProps {
  value: string;
  handleChange: (newValue: string) => void;
}

export default function IntegrationAutosuggest(
  props: IntegrationAutosuggestProps
) {
  const classes = useStyles();
  const [stateSuggestions, setSuggestions] = React.useState<OptionType[]>([]);

  const handleSuggestionsFetchRequested = ({value}: any) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = () => (
    event: React.ChangeEvent<{}>,
    {newValue}: Autosuggest.ChangeEvent
  ) => {
    props.handleChange(newValue);
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        classes,
        id: 'react-autosuggest-simple',
        label: 'Company',
        placeholder: 'Search companies...',
        value: props.value,
        onChange: handleChange(),
      }}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderSuggestionsContainer={options => (
        <Paper {...options.containerProps} square>
          {options.children}
        </Paper>
      )}
    />
  );
}
