import React from "react";
import {
  TextField,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
} from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
export default function ProcessedForm({ form }) {
  //   const {
  //     register,
  //     handleSubmit,
  //     watch,
  //     formState: { errors },
  //     control,
  //   } = useForm();
  //   function onSubmit(data) {}
  return (
    <Box sx={{ m: 1, width: 1 }}>
      <Box sx={{ m: 1 }}>
        <Typography variant="caption" color="textSecondary">
          <Box component="span" sx={{ color: "error.main", fontWeight: 600 }}>
            *
          </Box>
          These fields are required
        </Typography>
      </Box>
      <Box
        component="form"
        autoComplete="off"
        action={form.postUrl}
        method="POST"
        target=""
        //   onSubmit={handleSubmit(onSubmit)}
        sx={{ m: 1 }}
      >
        {form.field.map((field) => (
          <Box width={1} mb={4} mt={1}>
            {field.title && (
              <Typography sx={{ my: 1 }}>
                {field.required && (
                  <Box
                    component="span"
                    sx={{ color: "error.main", fontWeight: 600 }}
                  >
                    *
                  </Box>
                )}
                {field.title}
              </Typography>
            )}
            <FormField field={field} />
          </Box>
        ))}
        <div style={{ position: "absolute", left: -5000 }}>
          <input
            type="checkbox"
            name="liberal_emerald_wavy_dolphin"
            value="1"
            tabindex="-1"
            autocomplete="no"
          />
        </div>
        <Box width={1} display="flex" justifyContent="flex-end">
          <Button
            className="hoverLift hoverShadow"
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
function FormField({ field, control }) {
  const {
    fieldType,
    title,
    placeholder,
    required,
    option = [],
    validation,
    helperText,
  } = field;
  const id = title.replace(/\s/g, "-");
  switch (fieldType) {
    case "short text": {
      return (
        <TextField
          //   {...props}
          type={validation}
          id={id}
          helperText={helperText}
          required={required}
          placeholder={placeholder}
          fullWidth
          name={title}
          hiddenLabel
          InputProps={{
            sx: {
              backgroundColor: "rgba(255,255,255,0.5)",
              backdropFilter: "blur (6px)",
            },
          }}
        />
        // <Controller
        //   name={title}
        //   control={control}
        //   defaultValue=""
        //   rules={{}}
        //   render={(props) => (
        //     <TextField
        //       {...props}
        //       type={validation}
        //       id={id}
        //       helperText={helperText}
        //       required={required}
        //       placeholder={placeholder}
        //       fullWidth
        //       name={title}
        //       hiddenLabel
        //       InputProps={{
        //         sx: {
        //           backgroundColor: "rgba(255,255,255,0.5)",
        //           backdropFilter: "blur (6px)",
        //         },
        //       }}
        //     />
        //   )}
        // />
      );
    }
    case "long text": {
      return (
        <TextField
          fullWidth
          id={id}
          multiline
          hiddenLabel
          helperText={helperText}
          required={required}
          placeholder={placeholder}
          rows={3}
          maxRows={4}
          name={title}
          InputProps={{
            sx: {
              backgroundColor: "rgba(255,255,255,0.5)",
              backdropFilter: "blur (6px)",
            },
          }}
        />
      );
    }
    case "radio buttons": {
      return (
        <RadioGroup>
          {option.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      );
    }
    case "checkbox": {
      return <FormControlLabel control={<Checkbox />} label="Yes" />;
    }
    default:
      return <></>;
  }
}
