// import React from 'react';
// import {deburr} from 'lodash';
// import Autosuggest from 'react-autosuggest';
// import match from 'autosuggest-highlight/match';
// import parse from 'autosuggest-highlight/parse';
// import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
// import MenuItem from '@material-ui/core/MenuItem';
// import Popper from '@material-ui/core/Popper';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// interface OptionType {
//   label: string;
// }

// const suggestions: OptionType[] = [
//   { label: 'Finance' },
//   { label: 'Legal' },
//   { label: 'Equity' },
//   { label: 'M&A' },
//   { label: 'Debt' },
// ];

// function renderInputComponent(inputProps: any) {
//   const { classes, inputRef = () => {}, ref, ...other } = inputProps;

//   return (
//     <TextField
//       fullWidth
//       InputProps={{
//         inputRef: node => {
//           ref(node);
//           inputRef(node);
//         },
//         classes: {
//           input: classes.input,
//         },
//       }}
//       {...other}
//     />
//   );
// }

// function renderSuggestion(
//   suggestion: OptionType,
//   { query, isHighlighted }: Autosuggest.RenderSuggestionParams,
// ) {
//   const matches = match(suggestion.label, query);
//   const parts = parse(suggestion.label, matches);

//   return (
//     <MenuItem selected={isHighlighted} component="div">
//       <div>
//         {parts.map(part => (
//           <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
//             {part.text}
//           </span>
//         ))}
//       </div>
//     </MenuItem>
//   );
// }

// function getSuggestions(value: string) {
//   const inputValue = deburr(value.trim()).toLowerCase();
//   const inputLength = inputValue.length;
//   let count = 0;

//   return inputLength === 0
//     ? []
//     : suggestions.filter(suggestion => {
//         const keep =
//           count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

//         if (keep) {
//           count += 1;
//         }

//         return keep;
//       });
// }

// function getSuggestionValue(suggestion: OptionType) {
//   return suggestion.label;
// }

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       height: 250,
//       flexGrow: 1,
//     },
//     container: {
//       position: 'relative',
//     },
//     suggestionsContainerOpen: {
//       position: 'absolute',
//       zIndex: 1,
//       marginTop: theme.spacing(1),
//       left: 0,
//       right: 0,
//     },
//     suggestion: {
//       display: 'block',
//     },
//     suggestionsList: {
//       margin: 0,
//       padding: 0,
//       listStyleType: 'none',
//     },
//     divider: {
//       height: theme.spacing(2),
//     },
//   }),
// );

// interface AutoSuggestProps {
//   value: string;
//   handleChange: (newValue: string) => void;
// }

// export default function AutoSuggest(props: AutoSuggestProps) {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const [stateSuggestions, setSuggestions] = React.useState<OptionType[]>([]);

//   const handleSuggestionsFetchRequested = ({ value }: any) => {
//     setSuggestions(getSuggestions(value));
//   };

//   const handleSuggestionsClearRequested = () => {
//     setSuggestions([]);
//   };

//   const handleChange = () => (
//     event: React.ChangeEvent<{}>,
//     { newValue }: Autosuggest.ChangeEvent,
//   ) => {
//     props.handleChange(newValue)
//   };

//   const autosuggestProps = {
//     renderInputComponent,
//     suggestions: stateSuggestions,
//     onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
//     onSuggestionsClearRequested: handleSuggestionsClearRequested,
//     getSuggestionValue,
//     renderSuggestion,
//   };

//   return (
//     <Autosuggest
//       {...autosuggestProps}
//       inputProps={{
//         classes,
//         id: 'team',
//         label: 'Team',
//         placeholder: 'Team',
//         value: props.value,
//         onChange: handleChange,
//       }}
//       theme={{
//         container: classes.container,
//         suggestionsContainerOpen: classes.suggestionsContainerOpen,
//         suggestionsList: classes.suggestionsList,
//         suggestion: classes.suggestion,
//       }}
//       renderSuggestionsContainer={options => (
//         <Paper {...options.containerProps} square>
//           {options.children}
//         </Paper>
//       )}
//     />
//   );
// }
