import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/20/solid'

export function Failure({ heading, content }: any) {
  return (
    <div className="rounded-md bg-red-50 p-4 z-10">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{heading}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Success({ heading, content }: any) {
  return (
    <div className="rounded-md bg-green-50 p-4 z-10">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">{heading}</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Message({ content, type, heading }: any) {
  if (type == 'ERROR') {
    return (
      <div className="min-h-screen flex items-end justify-center">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <Failure heading={heading} content={content} />
      </div>
    );
  }
  else if (type == 'SUCCESS') {
    return (
      <div className="min-h-screen flex items-end justify-center">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <Success heading={heading} content={content} />
      </div>
    );
  }
}


