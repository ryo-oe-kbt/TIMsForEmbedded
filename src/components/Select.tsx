import * as React from 'react'
import { styled } from '@mui/material/styles'
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputBase,
} from '@mui/material'

const Input = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 25,
    backgroundColor: '#f7fafc',
    boxShadow: '0px 3px 6px #1717172d',
    padding: '3px 24px 4px 20px',
    fontSize: 14,
    '&:focus': {
      borderRadius: 25,
      backgroundColor: '#f7fafc',
    },
  },
}))

export const Select = () => {
  const [value, setSetValue] = React.useState<string>('0')
  const handleChange = (event: { target: { value: string } }) => {
    setSetValue(event.target.value)
  }
  return (
    <FormControl sx={{ ml: 3, width: 100 }} variant="standard">
      <MuiSelect value={value} onChange={handleChange} input={<Input />}>
        <MenuItem value={0}>月</MenuItem>
        <MenuItem value={1}>1月</MenuItem>
        <MenuItem value={2}>2月</MenuItem>
        <MenuItem value={3}>3月</MenuItem>
        <MenuItem value={4}>4月</MenuItem>
        <MenuItem value={5}>5月</MenuItem>
        <MenuItem value={6}>6月</MenuItem>
        <MenuItem value={7}>7月</MenuItem>
        <MenuItem value={8}>8月</MenuItem>
        <MenuItem value={9}>9月</MenuItem>
        <MenuItem value={10}>10月</MenuItem>
        <MenuItem value={11}>11月</MenuItem>
        <MenuItem value={12}>12月</MenuItem>
      </MuiSelect>
    </FormControl>
  )
}
