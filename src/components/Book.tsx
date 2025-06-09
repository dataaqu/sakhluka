import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { SiAirbnb } from 'react-icons/si';
import { FiClock, FiCheckCircle, FiX } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';

// Mock blocked dates - In production, this would come from Firebase/Airbnb iCal sync
const mockBlockedDates = [
  new Date(2025, 5, 10), // June 10, 2025
  new Date(2025, 5, 11), // June 11, 2025
  new Date(2025, 5, 15), // June 15, 2025
  new Date(2025, 5, 16), // June 16, 2025
  new Date(2025, 5, 20), // June 20, 2025
  new Date(2025, 5, 21), // June 21, 2025
  new Date(2025, 5, 25), // June 25, 2025
  new Date(2025, 5, 26), // June 26, 2025
  new Date(2025, 6, 4),  // July 4, 2025
  new Date(2025, 6, 5),  // July 5, 2025
];

interface BookedDate {
  date: Date;
  type: 'booked' | 'blocked';
}

const Book = ({ theme }: { theme?: string }) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [blockedDates, setBlockedDates] = useState<BookedDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate Firebase/iCal sync
  useEffect(() => {
    const fetchBlockedDates = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const formattedDates = mockBlockedDates.map(date => ({
        date,
        type: 'booked' as const
      }));
      
      setBlockedDates(formattedDates);
      setIsLoading(false);
    };

    fetchBlockedDates();
  }, []);

  // Check if a date is blocked
  const isDateBlocked = (date: Date): boolean => {
    return blockedDates.some(blockedDate => 
      blockedDate.date.toDateString() === date.toDateString()
    );
  };

  // Check if there are any blocked dates between two dates (exclusive of start and end)
  const hasBlockedDatesBetween = (startDate: Date, endDate: Date): boolean => {
    if (!startDate || !endDate || startDate >= endDate) return false;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check each day between start and end (excluding start and end dates)
    for (let d = new Date(start.getTime() + 24 * 60 * 60 * 1000); d < end; d.setDate(d.getDate() + 1)) {
      if (isDateBlocked(new Date(d))) {
        return true;
      }
    }
    return false;
  };

  // Enhanced filter for calendar dates - considers range restrictions
  const isCalendarDateAvailable = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Basic availability check
    if (date < today || isDateBlocked(date)) return false;
    
    // If check-in date is selected, check if this date would create a valid range
    if (checkInDate && date > checkInDate) {
      // Don't allow selection if there are blocked dates between check-in and this date
      return !hasBlockedDatesBetween(checkInDate, date);
    }
    
    return true;
  };



  // Handle single calendar date selection for range mode
  const handleDateSelection = (dates: [Date | null, Date | null] | Date | null) => {
    if (Array.isArray(dates)) {
      // Range selection mode - dates is [startDate, endDate]
      const [start, end] = dates;
      
      // If both dates are selected, check if there are blocked dates between them
      if (start && end && hasBlockedDatesBetween(start, end)) {
        // Don't allow selection if there are blocked dates in between
        // Keep only the start date and reset end date
        setCheckInDate(start);
        setCheckOutDate(null);
        return;
      }
      
      setCheckInDate(start);
      setCheckOutDate(end);
    } else {
      // Single date mode (fallback)
      const date = dates;
      if (!date) return;
      
      // If no check-in date is set, or if we're clicking before check-in date, set check-in
      if (!checkInDate || date <= checkInDate) {
        setCheckInDate(date);
        setCheckOutDate(null); // Reset check-out when setting new check-in
      } 
      // If check-in is set and we're clicking after it, set check-out
      else if (checkInDate && date > checkInDate) {
        // Check if there are blocked dates between check-in and selected date
        if (!hasBlockedDatesBetween(checkInDate, date)) {
          setCheckOutDate(date);
        }
      }
    }
  };

  // Calculate nights between dates
  const calculateNights = (): number => {
    if (checkInDate && checkOutDate) {
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 0;
  };

  // Check if current selection is valid (no blocked dates in between)
  const isSelectionValid = (): boolean => {
    if (!checkInDate || !checkOutDate) return false;
    return !hasBlockedDatesBetween(checkInDate, checkOutDate);
  };

  // Handle booking redirect to Airbnb
  const handleBookNow = () => {
    if (!isSelectionValid()) {
      alert('Please select valid dates without blocked days in between.');
      return;
    }
    // In production, this would include the selected dates in the URL
    const airbnbUrl = "https://airbnb.com/rooms/your-listing-id"; // Replace with actual listing URL
    window.open(airbnbUrl, '_blank');
  };

  // Clear all selected dates
  const clearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  return (
    <section className="bg-background py-32 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="text-center mb-16"
        >
          <h1 
            className="text-3xl md:text-5xl font-black uppercase mb-6"
            style={{
              color: theme === 'light' ? '#3154cf' : undefined
            }}
          >
            Availability Calendar
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <SiAirbnb className="text-red-500 text-2xl" />
            <p 
              className="text-xl md:text-2xl"
              style={{
                color: theme === 'light' ? '#3154cf' : undefined
              }}
            >
              Available dates — Book on Airbnb
            </p>
          </div>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-muted-foreground"
            >
              <FiClock className="animate-spin" />
              <span>Syncing with Airbnb calendar...</span>
            </motion.div>
          )}
        </motion.div>

        {/* Calendar Section */}
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
          className="grid lg:grid-cols-[65%_35%] md:grid-cols-1 gap-8 lg:gap-12"
        >
          {/* Calendar Visual */}
          <div 
            className="rounded-lg p-8 border border-border shadow-lg"
            style={{
              backgroundColor: theme === 'light' ? '#3154cf' : undefined
            }}
          >
            <div className="flex items-center justify-between mb-6">
              {!checkInDate && !checkOutDate && (
                <h3 
                  className="text-2xl font-semibold text-center flex-1"
                  style={{
                    color: theme === 'light' ? 'white' : undefined
                  }}
                >
                  Choose Your Dates
                </h3>
              )}
            </div>

            {/* Selected Dates Display */}
            {(checkInDate || checkOutDate) && (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <div>
                    <p 
                      className="text-sm font-medium mb-1"
                      style={{
                        color: theme === 'light' ? 'white' : undefined
                      }}
                    >Check-in Date</p>
                    <p 
                      className="text-lg font-semibold"
                      style={{
                        color: theme === 'light' ? 'white' : undefined
                      }}
                    >
                      {checkInDate ? checkInDate.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      }) : 'Not selected'}
                    </p>
                  </div>
                  <div>
                    <p 
                      className="text-sm font-medium mb-1"
                      style={{
                        color: theme === 'light' ? 'white' : undefined
                      }}
                    >Check-out Date</p>
                    <p 
                      className="text-lg font-semibold"
                      style={{
                        color: theme === 'light' ? 'white' : undefined
                      }}
                    >
                      {checkOutDate ? checkOutDate.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      }) : 'Not selected'}
                    </p>
                  </div>
                </div>
                
                {/* Clear Button */}
                {(checkInDate && checkOutDate) && (
                  <div className="flex justify-center mt-4">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={clearDates}
                      className="flex items-center gap-1 px-4 py-2 text-sm border border-border hover:border-destructive rounded-md transition-colors duration-200 cursor-pointer"
                      style={{
                        color: theme === 'light' ? 'white' : undefined
                      }}
                      title="Clear selected dates"
                    >
                      <FiX className="text-sm" />
                      Clear Dates
                    </motion.button>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-center">
              <DatePicker
                selected={checkInDate}
                onChange={handleDateSelection}
                filterDate={isCalendarDateAvailable}
                minDate={new Date()}
                inline
                selectsRange
                startDate={checkInDate}
                endDate={checkOutDate}
                calendarClassName="custom-calendar"
                disabled={isLoading}
              />
            </div>
            
            {/* Calendar Legend */}
            <div className="calendar-legend mt-6">
              <div className="legend-item">
                <div className="legend-dot legend-available"></div>
                <span 
                  className="text-green-700 dark:text-green-300"
                  style={{
                    color: theme === 'light' ? 'white' : undefined
                  }}
                >Available</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot legend-blocked"></div>
                <span 
                  className="text-red-700 dark:text-red-300"
                  style={{
                    color: theme === 'light' ? 'white' : undefined
                  }}
                >Blocked</span>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div 
            className="rounded-lg p-8 border border-border shadow-lg"
            style={{
              backgroundColor: theme === 'light' ? '#3154cf' : undefined
            }}
          >
            <h3 
              className="text-2xl font-semibold mb-6 text-center"
              style={{
                color: theme === 'light' ? 'white' : undefined
              }}
            >
              Your Booking
            </h3>
            
            {/* Booking Summary */}
            {checkInDate && checkOutDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                {isSelectionValid() ? (
                  <div className="p-6 bg-muted/30 rounded-lg border border-border">
                    <h4 
                      className="text-xl font-semibold mb-4"
                      style={{
                        color: theme === 'light' ? 'white' : undefined
                      }}
                    >Booking Summary</h4>
                    <div className="space-y-3 text-base">
                      <div className="flex justify-between items-center">
                        <span 
                          style={{
                            color: theme === 'light' ? 'white' : undefined
                          }}
                        >Check-in:</span>
                        <span 
                          className="font-medium"
                          style={{
                            color: theme === 'light' ? 'white' : undefined
                          }}
                        >{checkInDate.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span 
                          style={{
                            color: theme === 'light' ? 'white' : undefined
                          }}
                        >Check-out:</span>
                        <span 
                          className="font-medium"
                          style={{
                            color: theme === 'light' ? 'white' : undefined
                          }}
                        >{checkOutDate.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-border pt-3">
                        <span 
                          style={{
                            color: theme === 'light' ? 'white' : undefined
                          }}
                        >Total Nights:</span>
                        <span 
                          className="font-semibold text-lg"
                          style={{
                            color: theme === 'light' ? 'white' : undefined
                          }}
                        >
                          {calculateNights()} night{calculateNights() !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-3 flex items-center gap-2">
                      <FiX className="text-red-500" />
                      Invalid Date Range
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Your selected period contains blocked dates. Please choose different dates without any booked days in between.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Book Now Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.75, delay: 0.4 }}
            >
              <button
                onClick={handleBookNow}
                disabled={!checkInDate || !checkOutDate || isLoading || !isSelectionValid()}
                className="w-full group relative overflow-hidden bg-slate-950 text-white border border-slate-300 rounded-lg p-6 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
                
                {/* Airbnb background icon */}
                <SiAirbnb className="absolute -top-4 -right-4 text-6xl text-slate-800 group-hover:text-red-400 group-hover:rotate-12 transition-all duration-300" />
                
                {/* Button content */}
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <SiAirbnb className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-xl font-semibold">
                    {checkInDate && checkOutDate 
                      ? `Book ${calculateNights()} Night${calculateNights() !== 1 ? 's' : ''} on Airbnb` 
                      : 'Book Now on Airbnb'
                    }
                  </span>
                </div>
              </button>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <FiCheckCircle className="text-sm" />
                <span className="text-xs font-medium">Instant booking available on Airbnb</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for DatePicker */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .react-datepicker {
          border: 1px solid hsl(var(--border));
          border-radius: 8px;
          background-color: hsl(var(--card));
          color: hsl(var(--foreground));
          font-family: inherit;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          font-size: 16px;
        }
        
        .react-datepicker__header {
          background-color: hsl(var(--muted));
          border-bottom: 1px solid hsl(var(--border));
          border-radius: 8px 8px 0 0;
          padding: 16px 8px;
        }
        
        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: hsl(var(--foreground));
          font-weight: 600;
          font-size: 16px;
        }
        
        .react-datepicker__day-name {
          width: 2.5rem;
          height: 2rem;
          line-height: 2rem;
          margin: 0.15rem;
        }
        
        /* Available dates - default state */
        .react-datepicker__day {
          color: hsl(var(--foreground));
          border-radius: 6px;
          transition: all 0.2s ease;
          font-weight: 500;
          width: 2.5rem;
          height: 2.5rem;
          line-height: 2.5rem;
          margin: 0.15rem;
          font-size: 14px;
        }
        
        /* Available dates hover - green */
        .react-datepicker__day:hover:not(.react-datepicker__day--disabled):not(.react-datepicker__day--selected) {
          background-color: #22c55e !important;
          color: white !important;
          transform: scale(1.05);
        }
        
        /* Selected dates - green */
        .react-datepicker__day--selected {
          background-color: #22c55e !important;
          color: white !important;
          font-weight: 600;
          transform: scale(1.05);
          box-shadow: 0 2px 4px rgba(34, 197, 94, 0.3);
        }
        
        /* Selected date range - green */
        .react-datepicker__day--in-selecting-range,
        .react-datepicker__day--in-range {
          background-color: #dcfce7 !important;
          color: #166534 !important;
          border-radius: 0;
        }
        
        .react-datepicker__day--range-start {
          background-color: #22c55e !important;
          color: white !important;
          border-radius: 6px 0 0 6px !important;
        }
        
        .react-datepicker__day--range-end {
          background-color: #22c55e !important;
          color: white !important;
          border-radius: 0 6px 6px 0 !important;
        }
        
        /* Blocked/Booked dates - light red */
        .react-datepicker__day--disabled {
          color: #991b1b !important;
          background-color: #fecaca !important;
          font-weight: 600;
          cursor: not-allowed;
        }
        
        /* Today's date - subtle highlight */
        .react-datepicker__day--today:not(.react-datepicker__day--selected):not(.react-datepicker__day--disabled) {
          font-weight: 600;
          text-decoration: underline;
        }
        
        .react-datepicker__navigation {
          border: none;
          background: none;
        }
        
        .react-datepicker__navigation:hover {
          background-color: hsl(var(--accent));
          border-radius: 4px;
        }
        
        /* Add legend styles if needed */
        .calendar-legend {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 12px;
          font-size: 12px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .legend-available { background-color: #22c55e; }
        .legend-blocked { background-color: #dc2626; }
        
        /* Calendar popup positioning and styling */
        .checkin-calendar .react-datepicker-popper,
        .checkout-calendar .react-datepicker-popper {
          z-index: 9999 !important;
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
        
        .checkin-calendar .react-datepicker-popper[data-placement^="bottom"],
        .checkout-calendar .react-datepicker-popper[data-placement^="bottom"] {
          margin-top: 10px !important;
        }
        
        .react-datepicker {
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
          background-color: hsl(var(--background)) !important;
          font-family: inherit !important;
          position: relative !important;
        }
        
        .checkin-calendar .react-datepicker__triangle,
        .checkout-calendar .react-datepicker__triangle {
          border-bottom-color: hsl(var(--background)) !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
        
        .checkin-calendar .react-datepicker__triangle::before,
        .checkout-calendar .react-datepicker__triangle::before {
          border-bottom-color: hsl(var(--border)) !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
        
        /* Ensure calendar doesn't overflow viewport and centers properly */
        .checkin-calendar .react-datepicker-popper[data-placement*="bottom"],
        .checkout-calendar .react-datepicker-popper[data-placement*="bottom"] {
          left: 50% !important;
          right: auto !important;
          transform: translateX(-50%) !important;
        }
        `
      }} />
    </section>
  );
};

export default Book;