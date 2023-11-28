// @ts-nocheck
import supabase from '@/app/utils/supabase'
import { GetUID } from '@/app/utils/user_id'
import TotalCashDonatedChart from '@/components/TotalCashDonatedChart'
import TotalCashDonationsChart from '@/components/TotalCashDonationChart'
import TotalInKindDonatedChart from '@/components/TotalInKindDonated'
import TotalInKindTransactionsChart from '@/components/TotalInKindTransactionsChart'

export const revalidate = 0

export default async function Page() {
  const uid = await GetUID()
  const { data: charity_member, error: error_2 } = await supabase
    .from('decrypted_charity_member')
    .select('*, charity ( id, name )')
    .eq('user_uuid', uid)
  const charity_id = charity_member?.map((member) => member.charity?.id)
  //Total Cash Donations Received Query (INCOME)
  const { data: totalCashDonations, error: totalCashDonationsError } =
    await supabase
      .from('total_cash_donations_received')
      .select('total_cash_donations_received, month')
      .eq('charity_id', charity_id)
      .limit(12)
  const totalCashData =
    totalCashDonations?.flatMap((totalCash) => [
      {
        name: totalCash.month,
        totalCashDonations: totalCash.total_cash_donations_received,
      },
    ]) || []

  //Total In-Kind Transactions Received Query (INCOME)
  const { data: totalInKindTransactions, error: totalInKindTransactionsError } =
    await supabase
      .from('total_inkind_donation_transactions')
      .select('total_inkind_donation_transactions, month')
      .eq('charity_id', charity_id)
      .limit(12)
  const totalInKindData =
    totalInKindTransactions?.flatMap((totalInKind) => [
      {
        name: totalInKind.month,
        totalInKindTransactions: totalInKind.total_inkind_donation_transactions,
      },
    ]) || []

  //Total Cash Donations Donated Query (OUTCOME)
  const {
    data: totalCashDonationsDonated,
    error: totalCashDonationsDonatedError,
  } = await supabase
    .from('total_cash_donations_donated')
    .select('total_amount, month')
    .eq('charity_id', charity_id)
    .limit(12)
  const totalCashDonatedData =
    totalCashDonationsDonated?.flatMap((CashDonated) => [
      {
        name: CashDonated.month,
        totalCashDonated: CashDonated.total_amount,
      },
    ]) || []

  //Total In-Kind Donations Donated Query (OUTCOME)
  const { data: totalInKindDonated, error: totalInKindDonatedError } =
    await supabase
      .from('total_inkind_donations_donated')
      .select('total_quantity, month')
      .eq('charity_id', charity_id)
      .limit(12)
  const totalInKindDonatedData =
    totalInKindDonated?.flatMap((InKindDonated) => [
      {
        name: InKindDonated.month,
        totalInKindDonated: InKindDonated.total_quantity,
      },
    ]) || []

  return (
    <>
      <div className="py-9 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {charity_member?.map((charity, index) => (
            <h2
              key={index}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              {charity.charity?.name}&apos;s Donation Statistics
            </h2>
          ))}
          <p className="italic text-gray-600">
            What&apos;s displayed here is based on the most recent 12 months of
            data.
          </p>
        </div>
      </div>
      <h2 className="sm:text-4x1 text-3xl font-bold tracking-tight text-gray-900">
        Incomes
      </h2>
      <br />
      <h2 className="sm:text-4x1 text-2xl font-bold tracking-tight text-gray-900">
        Total Cash and In-Kind Donations
      </h2>
      <p className="mt-2 text-base leading-8 text-gray-600">
        How much cash donations and in-kind donation transactions are received
        per month.
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
        How much cash donations and how many in-kind are donated per month.
      </p>
      <br />
      <div className="flex flex-col md:flex-row md:gap-10">
        <TotalCashDonatedChart CashDonatedData={totalCashDonatedData} />
        <TotalInKindDonatedChart InKindDonatedData={totalInKindDonatedData} />
      </div>
    </>
  )
}
