import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  FormControlLabel,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Avatar,
  Typography,
  TextField,
  Switch,
  Divider,
  IconButton
} from '@material-ui/core';
import { AppContext } from 'adapter';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import ReactEcharts from 'echarts-for-react';
import clsx from 'clsx';
import QRCode from 'qrcode.react';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EcoIcon from '@material-ui/icons/Eco';
import 'echarts/map/js/china.js';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  mt: {
    marginTop: theme.spacing(4)
  },
  mr: {
    marginRight: theme.spacing(6)
  },
  pd: {
    paddingLeft: theme.spacing(1),
  },
  url: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    lineHeight: '1.2em',
    wordBreak: 'break-all',
    cursor: 'pointer'
  }
}));

// const randomData = () => {
//   return Math.round(Math.random() * 1000);
// }

// const getOption = () => {
//   return {
//     visualMap: {
//       min: 0,
//       max: 2500,
//       left: 'left',
//       top: 'bottom',
//       text: ['高', '低'],
//       calculable: true
//     },
//     series: [
//       {
//         name: 'iphone3',
//         type: 'map',
//         mapType: 'china',
//         roam: false,
//         label: {
//           normal: {
//             show: true
//           },
//           emphasis: {
//             show: true
//           }
//         },
//         data: [
//           { name: '北京', value: randomData() },
//           { name: '天津', value: randomData() },
//           { name: '上海', value: randomData() },
//           { name: '重庆', value: randomData() },
//           { name: '河北', value: randomData() },
//           { name: '河南', value: randomData() },
//           { name: '云南', value: randomData() },
//           { name: '辽宁', value: randomData() },
//           { name: '黑龙江', value: randomData() },
//           { name: '湖南', value: randomData() },
//           { name: '安徽', value: randomData() },
//           { name: '山东', value: randomData() },
//           { name: '新疆', value: randomData() },
//           { name: '江苏', value: randomData() },
//           { name: '浙江', value: randomData() },
//           { name: '江西', value: randomData() },
//           { name: '湖北', value: randomData() },
//           { name: '广西', value: randomData() },
//           { name: '甘肃', value: randomData() },
//           { name: '山西', value: randomData() },
//           { name: '内蒙古', value: randomData() },
//           { name: '陕西', value: randomData() },
//           { name: '吉林', value: randomData() },
//           { name: '福建', value: randomData() },
//           { name: '贵州', value: randomData() },
//           { name: '广东', value: randomData() },
//           { name: '青海', value: randomData() },
//           { name: '西藏', value: randomData() },
//           { name: '四川', value: randomData() },
//           { name: '宁夏', value: randomData() },
//           { name: '海南', value: randomData() },
//           { name: '台湾', value: randomData() },
//           { name: '香港', value: randomData() },
//           { name: '澳门', value: randomData() }
//         ]
//       },
//       {
//         name: 'iphone4',
//         type: 'map',
//         mapType: 'china',
//         label: {
//           normal: {
//             show: true
//           },
//           emphasis: {
//             show: true
//           }
//         },
//         data: [
//           { name: '北京', value: randomData() },
//           { name: '天津', value: randomData() },
//           { name: '上海', value: randomData() },
//           { name: '重庆', value: randomData() },
//           { name: '河北', value: randomData() },
//           { name: '安徽', value: randomData() },
//           { name: '新疆', value: randomData() },
//           { name: '浙江', value: randomData() },
//           { name: '江西', value: randomData() },
//           { name: '山西', value: randomData() },
//           { name: '内蒙古', value: randomData() },
//           { name: '吉林', value: randomData() },
//           { name: '福建', value: randomData() },
//           { name: '广东', value: randomData() },
//           { name: '西藏', value: randomData() },
//           { name: '四川', value: randomData() },
//           { name: '宁夏', value: randomData() },
//           { name: '香港', value: randomData() },
//           { name: '澳门', value: randomData() }
//         ]
//       },
//       {
//         name: 'iphone5',
//         type: 'map',
//         mapType: 'china',
//         label: {
//           normal: {
//             show: true
//           },
//           emphasis: {
//             show: true
//           }
//         },
//         data: [
//           { name: '北京', value: randomData() },
//           { name: '天津', value: randomData() },
//           { name: '上海', value: randomData() },
//           { name: '广东', value: randomData() },
//           { name: '台湾', value: randomData() },
//           { name: '香港', value: randomData() },
//           { name: '澳门', value: randomData() }
//         ]
//       }
//     ]
//   };
// }

const Budget = props => {
  const { className, ...rest } = props;
  const { user } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const [size, setSize] = useState('10');
  const [random, setRandom] = useState(false);
  const [detail, setDetail] = useState(false);

  const apiUrl = `${window.location.origin}/echo-api/proxy-resource/query?Token=${user.apiToken}&size=${size}&random=${random}&detail=${detail}`;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        {/* <Grid container >
          <ReactEcharts
            option={getOption()}
            style={{ width: '100%', height: '300px' }} />
        </Grid> */}
        <Grid container justify="center">
          <Grid item>
            <Avatar className={classes.avatar}>
              <OfflinePinIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item className={clsx(classes.pd, classes.mr)}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              最大接入终端数
            </Typography>
            <Typography variant="h3" align="center">{user.registerQuota}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EcoIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item className={clsx(classes.pd, classes.mr)}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              最多提取ip数
            </Typography>
            <Typography variant="h3" align="center">{user.userQuota}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <NetworkCheckIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item className={classes.pd}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              最大并发
            </Typography>
            <Typography variant="h3" align="center">{user.qpsQuota}s</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardHeader title="代理提取API配置" />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={4} >
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={random}
                  onChange={(e) => setRandom(e.target.checked)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="随机显示"
            />
          </Grid>
          <Grid item xs={4} >
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  value={detail}
                  onChange={(e) => setDetail(e.target.checked)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="显示详情"
            />
          </Grid>
          <Grid item xs={4} >
            <TextField
              style={{ width: "100%" }}
              size="small"
              label="提取数量"
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)} />
          </Grid>
          <Grid item xs={12} >
            <CopyToClipboard text={apiUrl}
              onCopy={() => enqueueSnackbar("复制成功", {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
              }, 2)}>
              <Typography
                className={classes.url}
                color="textSecondary"
                variant="caption"
              >
                {apiUrl}
                <IconButton style={{ marginLeft: 15 }} color="primary" aria-label="upload picture" component="span">
                  <FileCopyIcon />
                </IconButton>
              </Typography>
            </CopyToClipboard>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardHeader title="域(APP 扫码)" />
      <Divider />
      <CardContent>
        <QRCode value={window.location.origin.substring(-1)} />
      </CardContent>
    </Card>
  );
};

export default Budget;
