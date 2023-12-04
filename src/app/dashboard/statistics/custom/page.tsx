// @ts-nocheck
import supabase from '@/app/utils/supabase'
import { GetUID } from '@/app/utils/user_id'
import TotalCashDonatedChart from '@/components/TotalCashDonatedChart'
import TotalCashDonationsChart from '@/components/TotalCashDonationChart'
import TotalInKindDonatedChart from '@/components/TotalInKindDonated'
import TotalInKindTransactionsChart from '@/components/TotalInKindTransactionsChart'
import { Button } from '@/components/Button'
import SlideOver from '@/components/SlideOverButton'
import { TextField } from '@/components/Fields'
import Alert from '@/components/Alert'

export const revalidate = 0


export default async function Page({searchParams}: any) {
  //This is formatted to the following: (nameofmonth dd, yyyy)
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  //start and end date parameters obtained from the form
  const startDate = searchParams.start_date
  const endDate = searchParams.end_date
  
  //checks if start and end date are valid, otherwise returns an error message
  const fetchData = async () => {
    if(startDate <= endDate && endDate >= startDate){
      const uid = await GetUID()
      const { data: charity_member, error: error_2 } = await supabase
        .from('charity_member')
        .select('*, charity ( id, name )')
        .eq('user_uuid', uid)
      const charity_id = charity_member?.map((member) => member.charity?.id)
      //Total Cash Donations Received Query (INCOME)
      const { data: totalCashDonations, error: totalCashDonationsError } =
      await supabase
        .from('daily_total_cash_donations_received')
        .select('*')
        .eq('charity_id', charity_id)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', {ascending: false})
      const sortedtotalCashData = totalCashDonations?.reverse() || []
      const totalCashData =
      sortedtotalCashData?.flatMap((totalCash) => [
        {
          name: totalCash.formatted_date,
          totalCashDonations: totalCash.total_cash_donations_received,
        },
      ]) || []
      //Total In-Kind Transactions Received Query (INCOME)
      const { data: totalInKindTransactions, error: totalInKindTransactionsError } =
      await supabase
        .from('daily_total_inkind_donation_transactions')
        .select('*')
        .eq('charity_id', charity_id)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false })     
      const sortedtotalInKindTransactions = totalInKindTransactions?.reverse() || []
      const totalInKindData =
      sortedtotalInKindTransactions?.flatMap((totalInKind) => [
        {
          name: totalInKind.formatted_date,
          totalInKindTransactions: totalInKind.total_inkind_donation_transactions,
        },
      ]) || []
      //Total Cash Donations Donated Query (OUTCOME)
      const {
      data: totalCashDonationsDonated,
      error: totalCashDonationsDonatedError,
      } = await supabase
      .from('daily_total_cash_donations_donated')
      .select('*')
      .eq('charity_id', charity_id)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false })
      const sortedtotalCashDonated = totalCashDonationsDonated?.reverse() || []
      const totalCashDonatedData =
      sortedtotalCashDonated?.flatMap((CashDonated) => [
        {
          name: CashDonated.formatted_date,
          totalCashDonated: CashDonated.total_amount,
        },
      ]) || []
      //Total In-Kind Donations Donated Query (OUTCOME)
      const { data: totalInKindDonated, error: totalInKindDonatedError } =
      await supabase
        .from('daily_total_inkind_donations_donated')
        .select('*')
        .eq('charity_id', charity_id)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false })        
      const sortedtotalInKindDonated = totalInKindDonated?.reverse() || []
      const totalInKindDonatedData =
      sortedtotalInKindDonated?.flatMap((InKindDonated) => [
        {
          name: InKindDonated.formatted_date,
          totalInKindDonated: InKindDonated.total_quantity,
        },
      ]) || []
      const filteredData = {
        totalCashData,
        totalCashDonatedData,
        totalInKindData,
        totalInKindDonatedData
      }
      const allArraysEmpty = (
        JSON.stringify(filteredData.totalCashData) === '[]' &&
        JSON.stringify(filteredData.totalCashDonatedData) === '[]' &&
        JSON.stringify(filteredData.totalInKindData) === '[]' &&
        JSON.stringify(filteredData.totalInKindDonatedData) === '[]'
      );
      if(allArraysEmpty){
        const uid = await GetUID()
        const { data: charity_member, error: error_2 } = await supabase
          .from('charity_member')
          .select('*, charity ( id, name )')
          .eq('user_uuid', uid)
        const charity_id = charity_member?.map((member) => member.charity?.id)
          console.log("Date range specified does not exist on the server.")
          const alertMessage = 'Date range specified does not exist on the server.'
          return {charity_id, charity_member, alertMessage};
      }
      else{
        console.log(filteredData)
        return {totalCashData, charity_member, charity_id, totalCashDonatedData, totalInKindData, totalInKindDonatedData}
      }
    }
    else if(startDate == null && endDate == null){
      console.log("No data input detected")
      const uid = await GetUID()
      const { data: charity_member, error: error_2 } = await supabase
        .from('charity_member')
        .select('*, charity ( id, name )')
        .eq('user_uuid', uid)
      const charity_id = charity_member?.map((member) => member.charity?.id)
      return {charity_member, charity_id}
    }
    else {
      console.log("Invalid start or end date specified, make sure that start date is before end date, and vice versa.")
      const alertMessage =
      'Invalid start or end date specified. Please make sure that the start date is before the end date, and vice versa.';
      const uid = await GetUID()
      const { data: charity_member, error: error_2 } = await supabase
        .from('charity_member')
        .select('*, charity ( id, name )')
        .eq('user_uuid', uid)
      const charity_id = charity_member?.map((member) => member.charity?.id)
      return {charity_member, charity_id, alertMessage}
    }
  }
  console.log("Start Date: " + startDate)
  console.log("End Date: " + endDate)
  const setData = await fetchData() //This is called in order to begin rendering the data in the actual page.

  //Actual Page rendered for Statistics Page  
  return (
    <>
      <div className="py-9 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {setData.charity_member?.map((charity, index) => (
            <h2
              key={index}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              {charity.charity?.name}&apos;s <span className="text-3xl font-bold tracking-tight text-slate-500 sm:text-4xl inline">Custom</span> Donation Statistics
            </h2>
          ))}
          <p className="italic text-gray-600">
            What&apos;s displayed here is based on a custom range of data; e.g: start date - end date
          </p>
        </div>
      </div>
      <div className="flex gap-x-2">
          <Button href="/dashboard/statistics/yearly" variant="outline" color="green">
              Yearly
          </Button>
          <Button href="/dashboard/statistics" variant="outline" color="yellow">
              Monthly
          </Button>
          <Button href="/dashboard/statistics/daily" variant="outline" color="blue">
              Daily
          </Button>
          <div className="flex gap-x-2">
            <Button href="/dashboard/statistics/custom" variant="solid" color="slate">
                Custom
            </Button>
              <SlideOver title="Set a Custom Date Range" buttontext="Set Data" variant="solid" color="slate">
                <form className="space-y-6" action="/dashboard/statistics/custom" method="GET">
                <TextField
                label="Start Date"
                name="start_date"
                type="date"
                required
                />
                <TextField
                label="End Date"
                name="end_date"
                type="date"
                required
                />
                <div className="flex flex-col items-center">
                  <Button type="submit" variant="solid" color="green" className="w-64 mt-2">
                      <span>
                      Set Data <span aria-hidden="true">&rarr;</span>
                      </span>
                  </Button>
                </div>
                </form>
            </SlideOver>
          </div>
      </div>
      <br/>
      <div className="font-bold">
        {startDate && endDate ? (
          <>
            <p className="text-green-700 inline">Current Data: </p>
            <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
          </>
        ) : (
          <p className="text-gray-600 italic">No data currently present</p>
        )}
      </div>
      <div className="max-w-screen-sm mt-4">
      {setData.alertMessage && <Alert message={setData.alertMessage} />}
      </div>
      <br/>
      <h2 className="sm:text-4x1 text-3xl font-bold tracking-tight text-gray-900">
        Incomes
      </h2>
      <br />
      <h2 className="sm:text-4x1 text-2xl font-bold tracking-tight text-gray-900">
        Total Cash and In-Kind Donations
      </h2>
      <p className="mt-2 text-base leading-8 text-gray-600">
        How much cash donations and in-kind donation transactions are received
        based on date provided.
      </p>
      <br />
      <div className="flex flex-col md:flex-row md:gap-10">
        <TotalCashDonationsChart CashData={setData?.totalCashData}/>
        <TotalInKindTransactionsChart InKindData={setData?.totalInKindData} />
      </div>
      <br />
      <h2 className="sm:text-4x1 text-3xl font-bold tracking-tight text-gray-900">
        Outcomes
      </h2>
      <br />
      <h2 className="sm:text-4x1 text-2xl font-bold tracking-tight text-gray-900">
        Total Cash and In-Kind Donated
      </h2>
      <p className="mt-2 text-base leading-8 text-gray-600">
        How much cash donations and how many in-kind are donated based on date provided.
      </p>
      <br />
      <div className="flex flex-col md:flex-row md:gap-10">
        <TotalCashDonatedChart CashDonatedData={setData?.totalCashDonatedData} />
        <TotalInKindDonatedChart InKindDonatedData={setData?.totalInKindDonatedData} />
      </div>
    </>
  )
}