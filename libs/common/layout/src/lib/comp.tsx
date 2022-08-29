import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ETHICON from '@common/assets/images/ETH.svg'
import BNBICON from '@common/assets/images/BNB.svg'
import BTCICON from '@common/assets/images/BTC.svg'

interface compProps {
  name: string;
  symbol: string;
  price: number;
  percentChange: number;
  index: number,
}

export function Comp({
  name,
  symbol,
  price,
  percentChange,
  index,
}: compProps) {
  return (
    <Grid 
      container
      justifyContent='space-between'
      alignItems='center'
      sx={{
        color:'white',
        width:'85%',
        background: '#0F172A',
        boxShadow: '0px 27px 20px rgba(0, 0, 0, 0.02)',
        opacity: index === 1 ? '1' : '.6',
        padding: '.75rem 1rem',
        borderRadius: '10px',
        marginTop: '1rem'
      }}
    >
      <Grid 
        item
        sx={{
          display:'flex',
          alignItems:'center'
        }}
      >
        <Box>
          {symbol === 'BTC' && <img src={BTCICON} alt={name} />}
          {symbol === 'ETH' && <img src={ETHICON} alt={name} />}
          {symbol === 'BNB' && <img src={BNBICON} alt={name} />}
        </Box>
        <Box
          sx={{
            marginLeft: 2
          }}
        >
          <Typography
            variant="h4"
          >
            {name}
          </Typography> 
          <Typography
            variant="h5"
            style={{
              marginTop: 5,
              color: '#E2E8F0',
            }}
          >
            {symbol}
          </Typography> 
        </Box>
      </Grid>
      <Grid 
        item
        sx={{
          textAlign: 'end'
        }}
      >
        <Typography
          variant="h4"
        >
          ${price.toLocaleString('us')}
        </Typography>
        <div
          style={{
            background: percentChange.toString().startsWith('-') ?`linear-gradient(270deg, #D23030 0%, rgba(210, 48, 48, 0) 110%)` : `linear-gradient(270deg, #30D299 0%, rgba(48, 210, 153, 0) 110%)`,
            borderRadius: '7px',
            width:'60px',
            height: '8px',
            display:'block',
            marginTop: 10
          }}
        >
        </div>
      </Grid>
    </Grid>
  )
}