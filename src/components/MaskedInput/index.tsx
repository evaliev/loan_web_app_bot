import { IMaskMixin } from 'react-imask';

import FormInput from '../../components/Form/FormInput/FormInput';

const MaskedStyledInput = IMaskMixin(({ inputRef, ...props }) => (
  <FormInput
    {...props}
    ref={inputRef}
    label={props.label || ''}
    name={props.name || ''}
  />
));

MaskedStyledInput.displayName = 'MaskedStyledInput';

export default MaskedStyledInput;
