import React, {useState, useEffect, SyntheticEvent} from 'react';
import idx from 'idx';
import Snackbar from '@material-ui/core/Snackbar';

import Header from './components/Header';
import SelectTemplateStep from './components/SelectTemplateStep';
import CreateTemplateStep from './components/CreateTemplateStep';
import CreateListStep from './components/CreateListStep';
import FlashMessage from '../../common/FlashMessage';

import {NotificationType} from '../../../constants/types';
import {useAllTemplates} from '../../../graphql/queries/AllTemplates';
import {
  AllTemplates_templateLists,
  AllTemplates,
} from '../../../graphql/queries/__generated__/AllTemplates';

export default function CreateListPage() {
  const [step, setStep] = useState<number>(0);
  const [selectedTemplate, setSelectedTemplate] = useState<AllTemplates_templateLists>({
    __typename: 'List',
    id: '',
    name: '',
    tasks: [],
  });
  const [messageOpen, setMessageOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const {loading, data, error, fetchMore} = useAllTemplates({});

  useEffect(() => {
    if (!loading && step === 0) {
      loadMore();
    }
  }, [step]);

  useEffect(() => {
    const lists = idx(data, data => data.templateLists);

    if (loading || !lists) return;
  }, [loading, idx(data, data => data.templateLists)]);

  useEffect(() => {
    if (notification) {
      setMessageOpen(true);
    }
  }, [notification]);

  const handleCloseMessage = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageOpen(false);
  };

  const loadMore = () => {
    fetchMore({
      variables: {},
      updateQuery: (
        previousResult: AllTemplates,
        options: {
          fetchMoreResult?: AllTemplates;
          variables?: {};
        }
      ) => {
        const fetchMoreResult = idx(
          options,
          options => options.fetchMoreResult
        );

        if (!fetchMoreResult) return previousResult;

        return {
          templateLists: [...fetchMoreResult.templateLists],
        };
      },
    });
  };

  return (
    data && (
      <div>
        {notification && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={messageOpen}
            autoHideDuration={3000}
            onClose={handleCloseMessage}
          >
            <FlashMessage
              variant={notification.variant}
              message={notification.message}
              onClose={handleCloseMessage}
            />
          </Snackbar>
        )}

        <Header step={step} setStep={setStep} />

        <SelectTemplateStep
          data={data.templateLists}
          setSelectedTemplate={setSelectedTemplate}
          stepNumber={0}
          currentStep={step}
          setStep={setStep}
        />

        <CreateTemplateStep
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          stepNumber={1}
          currentStep={step}
          setStep={setStep}
        />
        
        <CreateListStep
          selectedTemplate={selectedTemplate}
          stepNumber={2}
          currentStep={step}
          setNotification={setNotification}
        />
      </div>
    )
  );
}
