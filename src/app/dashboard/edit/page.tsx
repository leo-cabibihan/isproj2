import { SelectField, TextField } from '@/components/Fields'

export default function ExternalEdit() {
    return (
        <> 
            <form className="py-9">
            <div className="space-y-12">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Edit External Income</h2>
                </div>

                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                    <div className="sm:col-span-4">
                    <SelectField
                        label='Donor'
                        name="email"
                        autoComplete="email"
                        required
                    >
                        <option>Red Cross Philippines</option>
                        <option>Tulong Lasalyano</option>
                    </SelectField>

                    <div className="sm:col-span-4 py-5">
                    <SelectField
                        label='Donation Amount'
                        name="email"
                        autoComplete="email"
                        required
                    >
                        <option>50 php</option>
                        <option>100 php</option>
                        <option>500 php</option>
                        <option>1000 php</option>
                    </SelectField>

                    

                    /** Here is the shit for the download button? check figma */
                    
                    <TextField
                        label="Charity Organization's Name"
                        name="name"
                        type="name"
                        autoComplete="name"
                        required
                    />
                        
                    <TextField
                        label="Description"
                        name="description"
                        type="description"
                        autoComplete="description"
                        required
                    />

        

                    <div className="col-span-full">
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Save
                        </button>
                        <button
                        type="submit"
                        className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Delete
                        </button>
                        <button
                        type="submit"
                        className="rounded-md bg-white-600 px-3 py-2 text-sm font-semibold text-blue shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-5 focus-visible:outline-offset-5 focus-visible:outline-black-600"
                        >
                        Cancel
                        </button>
                    </div>

                    </div>
                </div>
                </div>
            </div>
            </div>
        </form>
        </>
    )
}