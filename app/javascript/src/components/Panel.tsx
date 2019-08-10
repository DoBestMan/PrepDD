import React, { ReactComponentElement } from 'react';
import clsx from 'clsx';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Tabs, 
  Tab
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    tabs: {
      borderBottom: '1px solid #D8D8D8'
    },
    tabsIndicator: {
      height: '4px', 
      backgroundColor: '#3A84FF',
      borderRadius: '3px 3px 0 0'
    },
    tab: {
      minWidth: 36, 
      padding: 0, 
      fontSize: '12px',
      fontWeight: 'bold', 
      color: '#606060',
      fontFamily: 'Montserrat',
      lineHeight: '20px',
      textTransform: 'capitalize',
      marginRight: '24px',
      '&:hover': {
        color: '#3A84FF',
        opacity: 1
      }
    },
    tabSelected: {
      color: '#3A84FF'
    }
  })
);

interface PanelProps {
  children: React.ReactNode, 
  title: string, 
  labels: string[], 
}

interface NewPaneType {
  hidden: boolean, 
  value: number, 
  index: number, 
  children?: React.ReactNode
}

export default function Panel(props: PanelProps) {
  const { children, title, labels, ...others } = props
  const classes = useStyles();
  const [index, setIndex] = React.useState<number>(0);

  const handleChange = (event: unknown, newIndex: number) => setIndex(newIndex);

  const isHidden = (id: number) => index !== id;

  const newPanes = React.Children.map(children, (child: any, id: number) => 
    React.cloneElement<NewPaneType>(child, {
      hidden: isHidden(id), 
      value: index, 
      index: id
    })
  );

  console.log(newPanes);

  return (
    <div>
      <Tabs
        classes={{
          root: classes.tabs, 
          indicator: classes.tabsIndicator
        }}
        value={index}
        aria-label={title}
        onChange={handleChange}
        {...others}
      >
        { labels.map((label: string, id: number) => 
          <Tab 
            key={`pane-${id}`} 
            classes={{
              root: classes.tab,
              selected: classes.tabSelected
            }}
            label={label} 
          />
        )}
      </Tabs>
      {newPanes}
    </div>
  )
};