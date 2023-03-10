import { FC, useState } from 'react'
import { Box, Theme, TextField } from '@mui/material'
import 'powerbi-report-authoring'
// DatePickerインポート
import { ReactComponent as datepickerIcon } from '../assets/icons/datepicker_icon.svg'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import ja from 'date-fns/locale/ja'
import { addYears, subYears } from 'date-fns'

const styles = {
  // ラベル部分スタイル
  labelStyle: {
    '& .MuiOutlinedInput-root': {
      cursor: 'pointer',
      borderRadius: '100vh',
      height: '24px',
      borderColor: (theme: Theme) => theme.colors.white,
      backgroundColor: (theme: Theme) => theme.colors.white,
      padding: '4px 16px 2px 4px',
      '& fieldset': {
        border: 'none',  // 通常時のボーダー色(アウトライン)
      },
      '&:hover fieldset': {
        border: 'none',    // ホバー時のボーダー色(アウトライン)
      },
      '& label': {
        color: (theme: Theme) => theme.colors.gray, // 通常時のラベル色
      },
    },
    '& .MuiOutlinedInput': {
      padding: '0px',
    },
    '& input': {
      borderColor: (theme: Theme) => theme.colors.white,
      width: '100%',
      readonly: 'readonly',
      cursor: 'pointer',
    },
    '& .MuiInputBase-input': {
      color: (theme: Theme) => theme.colors.gray,    // 入力文字の色
      padding: '0px',
      height: '24px',
      fontSize: '16px',
    },
    ' .MuiInputAdornment': {
      margin: '0px',
    },
    ' .MuiInputAdornment-root': {
      marginLeft: '0px',
    },

    //アイコン
    '& svg': {
      height: '16px',
      width: '16px',
    },
  },

  // カレンダー内スタイル
  calendarStyle: {
    '.MuiCalendarOrClockPicker-root': {
      '& .PrivatePickersYear-yearButton': {
        width: '103px',
        '&.Mui-selected': {
          backgroundColor: (theme: Theme) => theme.palette.primary.main,
          color: (theme: Theme) => theme.colors.white,
          fontWeight: 'bold',
        },
      },
      '& .MuiYearPicker-root': {
        justifyContent: 'space-between',
        padding: '0 4px',
        color: (theme: Theme) => theme.colors.gray,
      },
    },
  },
}

type DateProps = {
  pickerDate: Date
  setPickerDate: React.Dispatch<React.SetStateAction<Date>>
}

export const YearPickerCalendar: FC<DateProps> = ({
  pickerDate,
  setPickerDate,
}) => {
  // DatePicker部分押下時(カレンダーが開いているかどうか)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // 年選択時
  const handleChange = (newValue: Date | null) => {
    if (newValue != null) {
      setPickerDate(newValue)
    }
  }

  return (
    <Box>
      {/* 年 */}
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ja}
        dateFormats={{ year: 'yyyy年' }}
        localeText={{
          previousMonth: '前月を表示',
          nextMonth: '次月を表示',
          cancelButtonLabel: 'キャンセル',
          okButtonLabel: '選択',
        }}
      >
        <Box sx={styles.labelStyle} width="114px">
          <DatePicker
            value={pickerDate}
            onChange={handleChange}
            views={['year']}
            maxDate={addYears(new Date(), 1)}
            minDate={subYears(new Date(), 5)}
            inputFormat="yyyy年"
            mask="____"
            disableHighlightToday={true}
            PaperProps={{ sx: styles.calendarStyle }}
            components={{
              OpenPickerIcon: datepickerIcon,
            }}
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            renderInput={(params) => (
              <TextField
              {...params}
              fullWidth
                inputProps={{ ...params.inputProps, readOnly: true }}
              onClick={(e) => setIsOpen(true)}
              />
            )}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  )
}
