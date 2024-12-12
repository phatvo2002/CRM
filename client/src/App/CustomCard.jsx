import { Autocomplete, styled, TextField } from '@mui/material';
// import { TextValidator } from 'react-material-ui-form-validator';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';

class CustomCard {

    static ContentBox = styled('div')(({ theme }) => ({
        margin: '30px',
        [theme.breakpoints.down('sm')]: { margin: '16px' },
        boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    }));

    static Title = styled('span')(() => ({
        fontSize: '1rem',
        fontWeight: '500',
        textTransform: 'capitalize',
        color: '#3c91c2',
        textAlign: 'center'
    }));

    static AutoComplete = styled(Autocomplete)(() => ({
        width: '100%',
        marginBottom: '10px'
    }));
    static Textfield = styled(TextField)(() => ({
        width: "100%",
        marginBottom: "10px",
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgb(23 117 206);',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'black'
        }
    }));

    static Container = styled("div")(({ theme }) => ({
        margin: "10px",
        [theme.breakpoints.down("sm")]: { margin: "16px" },
        "& .breadcrumb": {
            padding: "10px",
            [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
        },
    }));
    static DialogTitleRoot = styled(MuiDialogTitle)(({ theme }) => ({
        margin: 0,
        padding: theme.spacing(2),
        '& .closeButton': {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        background: 'rgb(172, 210, 107)',
        textAlign: 'center'
    }));

    static DialogContent = styled(MuiDialogContent)(({ theme }) => ({
        '&.root': { padding: theme.spacing(2) },
    }));
    static DialogActions = styled(MuiDialogActions)(({ theme }) => ({
        '&.root': { margin: 0, padding: theme.spacing(1) },
    }));
}
export const ContentBox = CustomCard.ContentBox;
export const Title = CustomCard.Title;
export const AutoComplete = CustomCard.AutoComplete;
export const Textfield = CustomCard.Textfield;
export const Container = CustomCard.Container;
export const DialogTitleRoot = CustomCard.DialogTitleRoot;
export const DialogContent = CustomCard.DialogContent;
export const DialogActions = CustomCard.DialogActions;

export default CustomCard;