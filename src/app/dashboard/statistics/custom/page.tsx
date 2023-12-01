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

export const revalidate = 0

export default async function Page() {
  //This is supposedly for custom data with a specified start and end date
 //let filteredtotalCashData: any[] = [];
 //let filteredtotalInKindData: any[] = [];
 //let filteredtotalCashDonatedData: any[] = [];
 //let filteredtotalInKindDonatedData: any[] = [];
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
      .order('date', { ascending: false })
      .limit(7)
  const sortedtotalCashData = totalCashDonations?.reverse() || []
  const totalCashData =
    sortedtotalCashData?.flatMap((totalCash) => [
      {
        name: totalCash.day,
        totalCashDonations: totalCash.total_cash_donations_received,
      },
    ]) || []
  //Total In-Kind Transactions Received Query (INCOME)
  const { data: totalInKindTransactions, error: totalInKindTransactionsError } =
    await supabase
      .from('daily_total_inkind_donation_transactions')
      .select('*')
      .eq('charity_id', charity_id)
      .order('date', { ascending: false })
      .limit(7)
  const sortedtotalInKindTransactions = totalInKindTransactions?.reverse() || []
  const totalInKindData =
    sortedtotalInKindTransactions?.flatMap((totalInKind) => [
      {
        name: totalInKind.day,
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
    .order('date', { ascending: false })
    .limit(7)
  const sortedtotalCashDonated = totalCashDonationsDonated?.reverse() || []
  const totalCashDonatedData =
    sortedtotalCashDonated?.flatMap((CashDonated) => [
      {
        name: CashDonated.day,
        totalCashDonated: CashDonated.total_amount,
      },
    ]) || []
  //Total In-Kind Donations Donated Query (OUTCOME)
  const { data: totalInKindDonated, error: totalInKindDonatedError } =
    await supabase
      .from('daily_total_inkind_donations_donated')
      .select('*')
      .eq('charity_id', charity_id)
      .order('date', { ascending: false })
      .limit(7)
  const sortedtotalInKindDonated = totalInKindDonated?.reverse() || []
  const totalInKindDonatedData =
    sortedtotalInKindDonated?.flatMap((InKindDonated) => [
      {
        name: InKindDonated.day,
        totalInKindDonated: InKindDonated.total_quantity,
      },
    ]) || []
 //const setData = async (formData: FormData) =>{
 //  "use server"
 //  if(new Date(formData.get("start_date") <= new Date(formData.get("end_date")))){
 //  //Total Cash Donations Received Query (INCOME)
 //  const { data: totalCashDonations, error: totalCashDonationsError } =
 //  await supabase
 //    .from('daily_total_cash_donations_received')
 //    .select('*')
 //    .eq('charity_id', charity_id)
 //    .range('date', startDate, endDate)
 //    .order('date', { ascending: false })
 //    .limit(7)
//
 //  const sortedtotalCashData = totalCashDonations?.reverse()
 //  const totalCashData =
 //    sortedtotalCashData?.flatMap((totalCash) => [
 //      {
 //        name: totalCash.day,
 //        totalCashDonations: totalCash.total_cash_donations_received,
 //      },
 //    ]) || []
 //  //Total In-Kind Transactions Received Query (INCOME)
 //  const { data: totalInKindTransactions, error: totalInKindTransactionsError } =
 //    await supabase
 //      .from('daily_total_inkind_donation_transactions')
 //      .select('*')
 //      .eq('charity_id', charity_id)
 //      .order('date', { ascending: false })
 //      .limit(7)
 //  const sortedtotalInKindTransactions = totalInKindTransactions?.reverse() || []
 //  const totalInKindData =
 //    sortedtotalInKindTransactions?.flatMap((totalInKind) => [
 //      {
 //        name: totalInKind.day,
 //        totalInKindTransactions: totalInKind.total_inkind_donation_transactions,
 //      },
 //    ]) || []
 //  //Total Cash Donations Donated Query (OUTCOME)
 //  const {
 //    data: totalCashDonationsDonated,
 //    error: totalCashDonationsDonatedError,
 //  } = await supabase
 //    .from('daily_total_cash_donations_donated')
 //    .select('*')
 //    .eq('charity_id', charity_id)
 //    .order('date', { ascending: false })
 //    .limit(7)
 //  const sortedtotalCashDonated = totalCashDonationsDonated?.reverse() || []
 //  const totalCashDonatedData =
 //    sortedtotalCashDonated?.flatMap((CashDonated) => [
 //      {
 //        name: CashDonated.day,
 //        totalCashDonated: CashDonated.total_amount,
 //      },
 //    ]) || []
 //  //Total In-Kind Donations Donated Query (OUTCOME)
 //  const { data: totalInKindDonated, error: totalInKindDonatedError } =
 //    await supabase
 //      .from('total_inkind_donations_donated')
 //      .select('total_quantity, month')
 //      .eq('charity_id', charity_id)
 //      .limit(7)
 //  const totalInKindDonatedData =
 //    totalInKindDonated?.flatMap((InKindDonated) => [
 //      {
 //        name: InKindDonated.month,
 //        totalInKindDonated: InKindDonated.total_quantity,
 //      },
 //    ]) || []
 //    filteredtotalCashData = totalCashData;
 //    filteredtotalInKindData = totalInKindData;
 //    filteredtotalCashDonatedData = totalCashDonatedData;
 //    filteredtotalInKindDonatedData = totalInKindDonatedData;
 //    return {filteredtotalCashData, filteredtotalInKindData, filteredtotalCashDonatedData, filteredtotalInKindDonatedData}
 //  }
 //  else{
//
 //  }
 //}

  //Actual Page rendered for Statistics Page  
  return (
    <>
      <div className="py-9 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {charity_member?.map((charity, index) => (
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
            <SlideOver title="Set Custom Data" buttontext="Set Data" variant="solid" color="slate">
              <form className="space-y-6" action={''} method="POST">
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
                <div className="col-span-full">
                  <Button type="submit" variant="solid" color="green" className="w-full">
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
          <TotalCashDonationsChart CashData={totalCashData} />
          <TotalInKindTransactionsChart InKindData={totalInKindData} />
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
        <TotalCashDonatedChart CashDonatedData={totalCashDonatedData} />
        <TotalInKindDonatedChart InKindDonatedData={totalInKindDonated} />
      </div>
    </>
  )
}
