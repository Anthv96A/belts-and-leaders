import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'carbon-react/lib/components/dialog';
import Form from 'carbon-react/lib/components/form';
import Textarea from 'carbon-react/lib/__experimental__/components/textarea';
import { Select, Option } from 'carbon-react/lib/components/select';
import DateInput from 'carbon-react/lib/__experimental__/components/date';
import Button from 'carbon-react/lib/components/button';
import { StyledHeading, StyledInlineWrapper } from './log-achievement.style';

const LogAchievement = ({ open, onClose }) => {
  const [values, setValues] = useState({
    category: '',
    maturity: '',
    date: '',
    description: ''
  });

  const [isDisabled, setIsDisabled] = useState(
    !values.category.length || !values.maturity.length || !values.date.length
  );

  const handleChange = useCallback((id, e) => {
    const newValue = id === 'date' ? e.target.value.rawValue : e.target.value;

    setValues({ ...values, [id]: newValue });
  }, [values]);

  const handleSubmit = () => {
    return null;
  };

  useEffect(() => {
    if (values.category.length && values.maturity.length && values.date.length) setIsDisabled(false);
    else if (!isDisabled) setIsDisabled(true);
  }, [isDisabled, values.category.length, values.maturity.length, values.date.length]);

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
              id='maturity'
              name='maturity'
              value={ values.maturity }
              onChange={ e => handleChange('maturity', e) }
              label='Maturity Level'
            >
              <Option text='Amber' value='1' />
              <Option text='Black' value='2' />
              <Option text='Blue' value='3' />
              <Option text='Brown' value='4' />
            </Select>
          </StyledInlineWrapper>
          <StyledInlineWrapper align='right'>
            <DateInput
              id='date'
              name='date'
              value={ values.date }
              onChange={ e => handleChange('date', e) }
              allowEmptyValue
              label='Date of Achievement'
              inputProps={ { inputWidth: 100 } }
            />
          </StyledInlineWrapper>
        </StyledInlineWrapper>
        <Textarea
          id='description'
          name='description'
          value={ values.description }
          onChange={ e => handleChange('description', e) }
          label='Description of Achievement'
        />
      </Form>
    </Dialog>
  );
};

LogAchievement.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default LogAchievement;
