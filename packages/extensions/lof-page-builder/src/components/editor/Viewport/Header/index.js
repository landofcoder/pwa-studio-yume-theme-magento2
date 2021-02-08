import React, { useState } from 'react';
import { useEditor } from '@craftjs/core';
import { mergeClasses } from '@landofcoder/yume-ui/src/classify';
import Button from '@landofcoder/yume-ui/src/components/Button';
import { FormattedMessage, useIntl } from 'react-intl';
import copy from "copy-to-clipboard";
import lz from "lzutf8";
import Dialog from '@landofcoder/yume-ui/src/components/Dialog';
import TextInput from '@landofcoder/yume-ui/src/components/TextInput';
import Field from '@landofcoder/yume-ui/src/components/Field';
import defaultClasses from './index.css';

export const Header = props => {
  const { formatMessage } = useIntl();
  const { actions, query, enabled, canUndo, canRedo } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo()
    })
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [stateToLoad, setStateToLoad] = useState(null);

  const classes = mergeClasses(defaultClasses, props.classes);

  return (
    <React.Fragment>
      <div className={classes.toolbar}>
        <div className={classes.left}>
          <Button
            disabled={false}
            priority="high"
            className={classes.highButtom}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled));
            }}
          >
            <FormattedMessage
              id={'pagBuilder.editStatus'}
              defaultMessage={'Finish Editing'}
            />
          </Button>
          <Button
            priority="normal"
            type="button"
            className={classes.normalButton}
            disabled={!canUndo}
            onClick={() => actions.history.undo()}
          >
            <FormattedMessage
              id={'pagBuilder.undo'}
              defaultMessage={'UNDO'}
            />
          </Button>
          <Button
            priority="normal"
            type="button"
            disabled={!canRedo}
            onClick={() => actions.history.redo()}
            className={classes.normalButton}
          >
            <FormattedMessage
              id={'pagBuilder.redo'}
              defaultMessage={'REDO'}
            />
          </Button>
        </div>
        <div className={classes.right}>
          <Button
            priority="normal"
            type="button"
            className={classes.normalButton}
            onClick={() => {
              copy(lz.encodeBase64(lz.compress(query.serialize())));
              console.log("State copied to clipboard.");
            }}
          >
            <FormattedMessage
              id={'pagBuilder.copyendcode'}
              defaultMessage={'COPY ENDCODED'}
            />
          </Button>
          <Button
            priority="normal"
            type="button"
            className={classes.normalButton}
            onClick={() => setDialogOpen(true)}
          >
            <FormattedMessage
              id={'pagBuilder.load'}
              defaultMessage={'LOAD'}
            />
          </Button>
        </div>

      </div>

      <Dialog
        isOpen={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        shouldShowButtons={false}
        title={formatMessage({
          id: 'pagBuilder.load',
          defaultMessage: 'Load Data'
        })}
        classes={{
          dialog: classes.dialog
        }}
      >
        
          <Field
            id="inputData"
            label={formatMessage({
              id: 'pagBuilder.inputData',
              defaultMessage: 'Load data'
            })}
          >
            <TextInput field="inputData" value={stateToLoad || ""}
              onChange={(e) => setStateToLoad(e.target.value)} />
          </Field>
          <Button
            priority="normal"
            type="button"
            className={classes.normalButton}
            onClick={() => {
              setDialogOpen(false);
              actions.deserialize(
                lz.decompress(lz.decodeBase64(stateToLoad))
              );
              console.log("State loaded!");
            }}
          >
            <FormattedMessage
              id={'pagBuilder.load'}
              defaultMessage={'LOAD'}
            />
          </Button>
      </Dialog>
    </React.Fragment>
  )
}