import React, { useEffect, useState } from "react";
import { Button, Container, Grid, TextField ,Autocomplete} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import UserApi, { useAddUserMutation } from "../../Api/UserApi";
import ApiData from "../../Api/ApiData";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from "sweetalert2";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RoleApi from "../../Api/RoleApi";
import Checkbox from '@mui/material/Checkbox';
import { toast } from "react-toastify";
const AddNguoiDung = () => {
  const styles = {
       display:"flex" ,
      justifyContent: "space-between" ,
      alignItems: "center" ,
      padding:5 ,
      paddingLeft:20 ,
      paddingRight:20,
      paddingTop : 20
    }
    const options = [
      { label: 'The Godfather', id: 1 },
      { label: 'Pulp Fiction', id: 2 },
    ];
    const navigate = useNavigate();
  const [tinhTrang,setTinhTrang] = useState([])
  const [chucVu ,setChucVu] = useState([])
  const [addUser] = useAddUserMutation()
  const [obj,setobj] = useState(
    {
      hoVaDem :"",
      ten : "",
      diaChi :"",
      soDienThoai :"",
      email :"",
      ngayThuViec:"",
      ngayBatDauLamViec:"",
      taiKhoan:"",
      matKhau:"",
      maChucVu:null,
      maPhongBan:null,
      maTinhTrang:null,
      isActive :false,
    }
  )

  const [stateError, setStateError] = useState({
    hoVaDem :"",
    ten : "",
    diaChi :"",
    soDienThoai :"",
    email :"",
    ngayThuViec:"",
    ngayBatDauLamViec:"",
    taiKhoan:"",
    matKhau:"",
    maChucVu:null,
    maPhongBan:null,
    maTinhTrang:0,
    isActive :false,
  });

  const handleChange = (name) => (event) => {
    setobj({ ...obj, [name]: event.target.value});
  }

  const handelChaneAutoConplete = (name) => (e,v) => {
    setobj({ ...obj, [name]: v.id });
  }
  const handleChangeDate = (name) => (e) => {
    setobj({ ...obj, [name]: e["$y"] + "-" + (e["$M"]+1 < 10 ? `0${e["$M"]+1}` : `${e["$M"]+1}` ) + "-" +  (e["$D"]+1 < 10 ? `0${e["$D"]+1}` : `${e["$D"]+1}` ) });
  }

  const gotoLink = ()=>{
    navigate("/thietlap/thietlapnhanvien")
  }

  useEffect(()=>{
      const getDataTinhTrang = async ()=>{
          const response = await ApiData.getTinhTrang()
          setTinhTrang(response)
      }
      getDataTinhTrang()
  },[])

  useEffect(()=>{
    const getDataChucVu= async ()=>{
        const response = await RoleApi.GetChucVu()
        setChucVu(response)
    }
    getDataChucVu()
},[])

  const handleSave = async () => {
    try {
       const response = await addUser(obj)
       console.log(response)
       if(response?.data?.status === 200)
       {
        toast.success("Thêm người dùng thành công", {
          position: "top-right",
          autoClose: 3000,  
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
        gotoLink()
       }
       else
       {
        toast.error("Đã có lỗi khi xảy ra", {
          position: "top-right",
          autoClose: 3000,  
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
       }
       
    } catch (error) {
       console.log(error)
    }
  }

  return (
    <Grid>
      <Grid container spacing={2}>
         <Grid xs={6} style={{display: "flex", alignItems: "center",justifyContent: "start", padding:10  }} >
          <Button style={{margin:20 , padding:4 , color:"black"}} onClick={gotoLink}>
            <KeyboardBackspaceIcon/>
          </Button>
          <span style={{fontSize: "1.2rem"}}> Thêm người dùng</span>
         </Grid>
         <Grid xs={6} style={{display: "flex", alignItems: "center",justifyContent: "end", padding:10  }} >
         <Button variant="contained" type="submit" onClick={handleSave}>Lưu và thêm</Button>
         </Grid>
      </Grid>
      <Container
        style={{
          maxWidth: "100%",
         // backgroundColor: "background.paper",
          marginBottom:20
        }}
      >
        <Grid container spacing={2} style={{ padding: 20 }}>
          <Grid item xs={2}style={{display: "flex", alignItems: "center",justifyContent: "center", }}>
            <PhotoCameraIcon
              style={{
                width: "50px",
                height: "50px",
                padding: 4,
                //backgroundColor: "background.paper",
              }}
            />
            <span
              style={{
                lineHeight: "60px",
                marginLeft: "10px",
              }}
            >
              Ảnh đại diện
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ padding: 20 }}>
          <Grid xs={12} >
            <h3>Thông tin chung</h3>
          
          </Grid>
      
          <Grid xs={6} style={styles}>
            <label style={{width:"30%" , fontWeight:"500"}}>Mã nhân viên</label>
            <TextField
              
              style={{ width: "70%" }}
              id="outlined-basic"
              value={"Mã tự sinh"}
              disabled={true}
              label="Mã nhân viên"
              variant="outlined"
            />
          </Grid>
          <Grid xs={6} style={styles}>
            <label style={{width:"30%" ,fontWeight:500}}>Họ và đệm</label>
            <TextField
              style={{ width: "70%" }}
              name="hoVaDem"
              id="outlined-basic"
              label="Họ và đệm"
              variant="outlined"
              onChange={handleChange('hoVaDem')}
            
            />
          </Grid>
          <Grid xs={6} style={styles}>
            <label style={{width:"30%" ,fontWeight:500}}>Tên</label>
            <TextField
              style={{ width: "70%" }}
              id="outlined-basic"
              label="Tên"
              variant="outlined"
              onChange={handleChange('ten')}
            />
          </Grid>
          <Grid xs={6} style={styles}>
            <label style={{width:"30%" ,fontWeight:500}}>Địa chỉ</label>
            <TextField
              style={{ width: "70%" }}
              id="outlined-basic"
              label="Địa chỉ"
              variant="outlined"
              onChange={handleChange('diaChi')}
            />
          </Grid>
          <Grid xs={6} style={styles}>
            <label style={{width:"30%" ,fontWeight:500}}>Số điện thoại</label>
            <TextField
              style={{ width: "70%" }}
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              onChange={handleChange('soDienThoai')}
            />
          </Grid>
          <Grid xs={6} style={styles}>
            <label style={{width:"30%" ,fontWeight:500}}>Email</label>
            <TextField
              style={{ width: "70%" }}
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid xs={12} >
            <h3>Thông tin công việc</h3>
          </Grid>
          <Grid xs={6} style={styles}>
            <label style={{width:"30%" ,fontWeight:500}}>Ngày thử việc</label>
            <LocalizationProvider  dateAdapter={AdapterDayjs} style={{width:"70%"}}>
                 <DatePicker sx={{width:"70%"}} onChange={handleChangeDate('ngayThuViec')}/>
            </LocalizationProvider>
          </Grid>
          <Grid xs={6} style={styles}>
            <label style={{width:"30%" ,fontWeight:500}}>Ngày chính thức</label>
            <LocalizationProvider  dateAdapter={AdapterDayjs} style={{width:"70%"}}>
                 <DatePicker   sx={{width:"70%"}} 
                   onChange={handleChangeDate("ngayBatDauLamViec")}
                 />
            </LocalizationProvider>
          </Grid>
          <Grid xs={6} style={styles}>
            <label style={{width:"30%" ,fontWeight:500}}>Tài khoản</label>
            <TextField
              style={{ width: "70%" }}
              id="outlined-basic"
              label="Tài khoản"
              variant="outlined"
              onChange={handleChange('taiKhoan')}
            />
          </Grid>
          <Grid xs={6} style={styles}>
            <label style={{width:"30%" ,fontWeight:500}}>Mật khẩu</label>
            <TextField
             type="password"
              style={{ width: "70%" }}
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              onChange={handleChange('matKhau')}
            />
          </Grid>

          <Grid xs={6} style={styles}>
          <label style={{width:"30%" ,fontWeight:500}}>Vai trò</label>
            <Autocomplete
             style={{ width: "70%" }}
             disablePortal
             options={chucVu}
             getOptionLabel={(option) => option.tenChucVu}
             renderInput={(params) => <TextField {...params} label="Vai trò" />}
             onChange={handelChaneAutoConplete('maChucVu')}
            />
          </Grid>
          <Grid xs={6} style={styles}>
          <label style={{width:"30%" ,fontWeight:500}}>Tình trạng</label>
            <Autocomplete
             style={{ width: "70%" }}
             disablePortal
             options={tinhTrang}
             getOptionLabel={(option) => option.tenTinhTrang}
             renderInput={(params) => <TextField {...params} label="Tình trạng" />}
             onChange={handelChaneAutoConplete('maTinhTrang')}
            />
          </Grid>
          <Grid xs={6} style={styles}>
          <label style={{width:"30%" ,fontWeight:500}}>Phòng ban</label>
            <Autocomplete
             style={{ width: "70%" }}
             disablePortal
             options={options}
             renderInput={(params) => <TextField {...params} label="Phòng ban" />}
             onChange={handelChaneAutoConplete("maPhongBan")}
            />
          </Grid>
          <Grid xs={12} style={{padding : 20}}>
          <label style={{fontWeight:500}}>Kích hoạt tài khoản</label>
          <Checkbox
          style={{width:"50px",height:"50px"}}
              onChange={(e)=>{
                   setobj({...obj , ["isActive"]:e.target.checked})
              }}
              inputProps={{ 'aria-label': 'controlled' }}
           />
          </Grid>
        </Grid>
      </Container>

    </Grid>
    
  );
};

export default AddNguoiDung;
