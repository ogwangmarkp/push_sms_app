/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React from 'react';
import { WithWizard } from 'react-albus';
import { Button } from 'reactstrap';

const BottomNavigation = ({
  className,
  onClickPrev,
  prevLabel,
  onClickNext,
  nextLabel,
  finishLabel,
  onClickFinish,
  saving
}) => {
  return (
    <WithWizard
      render={({ next, previous, step, steps }) => (
        <div className={`wizard-buttons ${className}`}>
          <Button
            color="primary"
            className={`mr-1 ${steps.indexOf(step) <= 0 ? 'disabled' : ''}`}
            onClick={() => {
              onClickPrev(previous, steps, step);
            }}
          >
            {prevLabel}
          </Button>

            {/* next button */}
          {steps.indexOf(step) < steps.length - 1 &&
            <Button
              color="primary"
              className={
                steps.indexOf(step) >= steps.length - 1 ? 'disabled' : ''
              }
              onClick={() => {
                onClickNext(next, steps, step);
              }}
            >
              {nextLabel}
            </Button>
          }

          {/* finish button */}
          {steps.indexOf(step) >= steps.length - 1 &&
            <Button
              color="success"
              disabled={saving}
              onClick={() => {
                onClickFinish();
              }}
            >
              {finishLabel}
            </Button>
          }

          
        </div>
      )}
    />
  );
};
export default BottomNavigation;
