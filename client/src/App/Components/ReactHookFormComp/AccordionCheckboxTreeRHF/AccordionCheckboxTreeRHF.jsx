import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import ExpandIcon from "@mui/icons-material/Expand";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LibraryAddCheckTwoToneIcon from "@mui/icons-material/LibraryAddCheckTwoTone";
import { FormHelperText } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { get } from "lodash";
import { array, bool, node, string } from "prop-types";
import * as React from "react";
import { useEffect, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { Controller, useFormContext } from "react-hook-form";
import { FaClipboardList, FaListAlt } from "react-icons/fa";
import PSCInputSkeleton from "src/components/PSCInputSkeleton";
import { v4 as uuid } from "uuid";

const FONT_SIZE_HELPER_TEXT = "0.8rem";

export default function AccordionCheckboxTreeRHF(props) {
  const component = "AutocompleteCheckboxTree",
    _id = uuid(),
    { name, data, label, style, skeletonLoading, ...otherProps } = props,
    [checkedTree, setCheckedTree] = useState([]),
    [expanded, setExpanded] = useState([]),
    uniqueArray = [...new Set(checkedTree)], // flat array checkedTree
    {
      control,
      setValue: setFormValue,
      formState: { errors },
    } = useFormContext(),
    getErrorMessage = () => {
      if (errors[name])
        return (
          <FormHelperText
            sx={{
              fontSize: FONT_SIZE_HELPER_TEXT,
              margin: "3px 14px 0",
              color: "#d32f2f",
            }}
          >
            {errors[name]?.message}
          </FormHelperText>
        );
      if (get(errors, name)?.message)
        return (
          <FormHelperText
            sx={{
              fontSize: FONT_SIZE_HELPER_TEXT,
              margin: "3px 14px 0",
              color: "#d32f2f",
            }}
          >
            {get(errors, name)?.message}
          </FormHelperText>
        );
      return "";
    };

  const handleHalfCheck = (checked, parentNode) => {
    if (parentNode) {
      const allChildrenChecked = parentNode?.children?.every((childId) =>
        Boolean(checked.includes(childId?.value))
      );

      const someChildrenChecked = parentNode?.parent?.children?.some(
        (childId) => Boolean(checked.includes(childId?.value))
      );
      const isHalfChecked = someChildrenChecked && !allChildrenChecked;

      if (isHalfChecked) {
        //  half-check state
        setCheckedTree((prevChecked) => [
          ...prevChecked,
          parentNode.parent.value,
        ]);
      }
      //   else {
      //     setCheckedTree((prevChecked) => [...prevChecked,]);
      //   }

      // Continue checking for parent's parent
      handleHalfCheck(checked, parentNode.parent);
    }
  };

  // Handle checkbox change
  const handleCheck = (checked, node, onChange) => {
    setCheckedTree(checked);
    onChange(checked);
    // Handle half-check logic
    handleHalfCheck(checked, node);
  };

  // Handle tree node expansion
  const handleExpand = (expanded) => {
    setExpanded(expanded);
  };

  // Update the form value
  useEffect(() => {
    if (uniqueArray?.length > 0) {
      setFormValue(name, uniqueArray);
    }
  }, [uniqueArray?.length]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        return (
          <PSCInputSkeleton loading={skeletonLoading}>
            <div className={component} >
              <React.Fragment>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CheckboxTree
                     
                      {...field}
                      {...otherProps}
                      id={_id}
                      nodes={data}
                      checked={field?.value}
                      onCheck={(checked, node) =>
                        handleCheck(checked, node, field.onChange)
                      }
                      expanded={expanded}
                      onExpand={handleExpand}
                      showExpandAll={true}
                      checkModel="all"
                      // disabled
                      icons={{
                        check: <CheckBoxIcon />,
                        uncheck: <CheckBoxOutlineBlankIcon />,
                        halfCheck: <LibraryAddCheckTwoToneIcon />,
                        expandClose: <KeyboardArrowRightIcon />,
                        expandOpen: <ExpandMoreIcon />,
                        expandAll: <ExpandIcon />,
                        collapseAll: <ExpandLessIcon />,
                        parentClose: <FaListAlt />,
                        parentOpen: <FaListAlt />,
                        leaf: <FaClipboardList />,
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
                {/* Error */}
                {getErrorMessage()}
              </React.Fragment>
            </div>
          </PSCInputSkeleton>
        );
      }}
    />
  );
}
// Specifies Type for props:
AccordionCheckboxTreeRHF.propTypes = {
  name: string.isRequired,
  label: node,
  data: array, // Array Object ( must have 3 key {label , value, children} )
  skeletonLoading: bool,
};

// Specifies the default values for props:
AccordionCheckboxTreeRHF.defaultProps = {
  label: null,
  data: [],
  skeletonLoading: false,
};
