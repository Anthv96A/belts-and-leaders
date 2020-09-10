import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'carbon-react/lib/components/dialog';
import Form from 'carbon-react/lib/components/form';
import Textarea from 'carbon-react/lib/__experimental__/components/textarea';
import { Select, Option } from 'carbon-react/lib/components/select';
import DateInput from 'carbon-react/lib/__experimental__/components/date';
import Button from 'carbon-react/lib/components/button';
import { StyledHeading, StyledInlineWrapper } from './log-achievement.style';

const initialState = {
  category: '',
  maturityLevelId: '',
  achievementDate: '',
  comment: ''
};

const LogAchievement = ({
  open, onClose, logAchievement, maturityLevels
}) => {
  const [values, setValues] = useState(initialState);

  const [isDisabled, setIsDisabled] = useState(
    !values.category.length || !values.maturityLevelId.length || !values.achievementDate.length
  );

  const handleChange = useCallback((id, e) => {
    const newValue = id === 'achievementDate' ? e.target.value.rawValue : e.target.value;
    setValues({ ...values, [id]: newValue });
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logAchievement({ ...values, maturityLevelId: Number(values.maturityLevelId) });
    } finally {
      setValues(initialState);
      onClose();
    }
  };


  useEffect(() => {
    console.log(maturityLevels);
    if (values.category.length && values.maturityLevelId.length && values.achievementDate.length) setIsDisabled(false);
    else if (!isDisabled) setIsDisabled(true);
  }, [isDisabled, values.category.length, values.maturityLevelId.length, values.achievementDate.length, maturityLevels]);

  return (
    <Dialog
      open={ open }
      onCancel={ onClose }
      title={ <StyledHeading>Log Achievement</StyledHeading> }
    >
      <Form
        rightSideButtons={ <Button onClick={ onClose }>Cancel</Button> }
        saveButton={ (
          <Button
            disabled={ isDisabled }
            buttonType='primary'
            type='submit'
          >
            Add
          </Button>
        ) }
        onSubmit={ handleSubmit }
      >
        <Select
          id='category'
          name='category'
          value={ values.category }
          onChange={ e => handleChange('category', e) }
          label='Achievement Category'
        >
          <Option text='Amber' value='1' />
          <Option text='Black' value='2' />
          <Option text='Blue' value='3' />
          <Option text='Brown' value='4' />
        </Select>
        <StyledInlineWrapper>
          <StyledInlineWrapper align='left'>
            <Select
              id='maturityLevelId'
              name='maturityLevelId'
              value={ values.maturityLevelId }
              onChange={ e => handleChange('maturityLevelId', e) }
              label='Maturity Level'
            >
              { maturityLevels.map((ml) => {
                return (
                  <Option
                    key={ ml.id } text={ ml.beltLevel }
                    value={ ml.id.toString() }
                  />
                );
              })}
            </Select>
          </StyledInlineWrapper>
          <StyledInlineWrapper align='right'>
            <DateInput
              id='achievementDate'
              name='achievementDate'
              value={ values.achievementDate }
              onChange={ e => handleChange('achievementDate', e) }
              allowEmptyValue
              label='Date of Achievement'
              inputProps={ { inputWidth: 100 } }
            />
          </StyledInlineWrapper>
        </StyledInlineWrapper>
        <Textarea
          id='comment'
          name='comment'
          value={ values.comment }
          onChange={ e => handleChange('comment', e) }
          label='Description of Achievement'
        />
      </Form>
    </Dialog>
  );
};

LogAchievement.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  logAchievement: PropTypes.func,
  maturityLevels: PropTypes.array
};

export default LogAchievement;
