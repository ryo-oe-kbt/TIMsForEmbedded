import { FC, useState } from 'react'
import { Box, Theme, styled, TextField } from '@mui/material'
import 'powerbi-report-authoring'
// DatePickerインポート
import { ReactComponent as datepickerIcon } from '../assets/icons/datepicker_icon.svg'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import ja from 'date-fns/locale/ja'
import dayjs from 'dayjs'
//週数
import isBetweenPlugin from 'dayjs/plugin/isBetween'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import {
  format,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  addYears,
  subYears,
  addDays,
  subDays,
  isSameDay,
} from 'date-fns'

type DateProps = {
  pickerDate: Date
  setPickerDate: React.Dispatch<React.SetStateAction<Date>>
}
// weekPicker インターフェース定義
type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean
  isFirstDay: boolean
  isLastDay: boolean
}

const styles = {
  // ラベル部分スタイル
  labelStyle: {
    '& .MuiOutlinedInput-root': {
      cursor: 'pointer',
      borderRadius: '100vh',
      height: '36px',
      borderColor: (theme: Theme) => theme.colors.white,
      backgroundColor: (theme: Theme) => theme.colors.white,
      padding: '8px 16px 5px 16px',
      '& fieldset': {
        border: 'none', // 通常時のボーダー色(アウトライン)
      },
      '&:hover fieldset': {
        border: 'none', // ホバー時のボーダー色(アウトライン)
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
      color: (theme: Theme) => theme.colors.gray, // 入力文字の色
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
      color: (theme: Theme) => theme.colors.gray,
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
      '& .PrivatePickersMonth-root': {
        '&.Mui-selected': {
          backgroundColor: (theme: Theme) => theme.palette.primary.main,
          color: (theme: Theme) => theme.colors.white,
          fontWeight: 'bold',
        },
      },
      '& .MuiPickersDay-root': {
        '&.Mui-selected': {
          backgroundColor: (theme: Theme) => theme.palette.primary.main,
          color: (theme: Theme) => theme.colors.white,
          fontWeight: 'bold',
        },
      },
      '& .MuiTypography-root': {
        color: (theme: Theme) => theme.colors.gray,
      },
    },
  },
}

export const WeekPickerCalendar: FC<DateProps> = ({
  pickerDate,
  setPickerDate,
}) => {
  // DatePicker部分押下時(カレンダーが開いているかどうか)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // 週選択時
  const handleChange = (newValue: Date | null) => {
    if (newValue != null) {
      setPickerDate(newValue)
    }
  }

  // 週モードの表示するState定義
  const getDisplayDate = (value: Date | null) => {
    if (value == null) {
      return ''
    } else {
      // 日付けを選択している場合
      let selectedDate = value.getDay()
      //選択日付けが日曜の場合
      if (selectedDate === 0) {
        const start = format(subDays(startOfWeek(value), 6), 'yyyy/MM/dd')
        const end = format(subDays(endOfWeek(value), 6), 'MM/dd')
        return start + ' ~ ' + end
      } else {
        //選択日付けが日曜以外の場合
        const start = format(addDays(startOfWeek(value), 1), 'yyyy/MM/dd')
        const end = format(addDays(endOfWeek(value), 1), 'MM/dd')
        return start + ' ~ ' + end
      }
    }
  }

  dayjs.extend(isBetweenPlugin)

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
      prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
  })<CustomPickerDayProps>(
    ({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
      //該当する週の場合
      ...(dayIsBetween && {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover, &:focus': {
          backgroundColor: theme.palette.primary.main,
        },
      }),
      //初日
      ...(isFirstDay && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
      }),
      //最終日
      ...(isLastDay && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
      }),
    })
  ) as React.ComponentType<CustomPickerDayProps>

  // weekPicker 週関数定義
  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    //見切れ修正
    const newPickersDayProps = {
      ...pickersDayProps, // デフォルトのPickersDayコンポーネントのプロパティ
      ...{
        showDaysOutsideCurrentMonth: true, // カレンダーの表示月以外の日もレンダリング
        disableMargin: true, // 日付同士の margin: 0
        disabled: pickersDayProps.outsideCurrentMonth // カレンダーの表示月以外の日は選択不可
          ? true
          : pickersDayProps.disabled,
      },
    }
    if (!pickerDate) {
      return <PickersDay {...newPickersDayProps} /> // 選択されていない場合、色塗り無しでレンダリング
    }

    // 色塗りする日付け範囲
    const selectedDayofWeek = pickerDate.getDay()
    let start //週の初日(月曜日)
    let end //週の最終日(日曜日)
    if (selectedDayofWeek === 0) {
      start = subDays(startOfWeek(pickerDate), 6)
      end = subDays(endOfWeek(pickerDate), 6)
    } else {
      start = addDays(startOfWeek(pickerDate), 1)
      end = addDays(endOfWeek(pickerDate), 1)
    }

    const dayIsBetween = isWithinInterval(date, { start, end })
    const isFirstDay = isSameDay(date, start)
    const isLastDay = isSameDay(date, end)

    return (
      // 選択されている場合、色塗り有りでレンダリング
      <CustomPickersDay
        {...newPickersDayProps}
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    )
  }

  return (
    <Box>
      {/* 週 */}
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ja}
        dateFormats={{ monthAndYear: 'yyyy年 MM月', year: 'yyyy年' }}
        localeText={{
          previousMonth: '前月を表示',
          nextMonth: '次月を表示',
          cancelButtonLabel: 'キャンセル',
          okButtonLabel: '選択',
        }}
      >
        <Box sx={styles.labelStyle} width="223px">
          <DatePicker
            value={pickerDate}
            onChange={handleChange}
            maxDate={addYears(new Date(), 1)}
            minDate={subYears(new Date(), 5)}
            inputFormat={getDisplayDate(pickerDate)}
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
            renderDay={renderWeekPickerDay}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  )
}
