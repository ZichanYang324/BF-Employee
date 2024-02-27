import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { StyledTextField } from './styles';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const CustomInput = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        type,
        name,
        value,
        handleChange,
        label,
        placeholder,
        errorMsg,
        disabled,
    } = props;
    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '32ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <StyledTextField
                    error={errorMsg ? true : false}
                    type={
                        type === 'password' ? (showPassword ? 'text' : 'password') : type
                    }
                    name={name}
                    disabled={disabled}
                    label={label}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                    InputProps={
                        type === 'password'
                            ? {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                            : null
                    }
                    helperText={<pre>{errorMsg}</pre>}
                />
            </Box>
        </div>
    );
}

CustomInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
    disabled: PropTypes.bool,
};

export default CustomInput