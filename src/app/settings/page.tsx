// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { TextField } from '@/components/Fields';
import { Button } from '@/components/Button';


export default function Settings() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Settings
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {isClient && (
                <form>
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Reset Password
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          This is the action of invalidating the current
                          password and then creating a new one.
                        </p>
                      </div>

                      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-4">
                          <TextField
                            label="Email Address"
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                          />
                          <br/>
                          <TextField
                            label="Old Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                          />
                          <br/>
                          <TextField
                            label="New Password"
                            name="password"
                            type="password"
                            required
                          />

                          <div className="mt-6 flex items-center justify-start gap-x-6">
                            <Button
                              type="submit"
                              variant="solid"
                              color="yellow"
                            >
                              Update Password
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                      <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Change account name.
                        </p>
                      </div>

                      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="sm:col-span-3">
                          <TextField
                            label="First Name"
                            placeholder="John"
                            type="name"
                            name="name"
                          />
                          <br/>
                          <TextField
                            label="Last Name"
                            placeholder="Doe"
                            type="name"
                            name="name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                      type="button"
                      variant="solid"
                      color="slate"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="solid"
                      color="green"
                      style={{ width: '100px' }}
                    >
                      Save
                    </Button>
                    <form action={'/logout-post'} method="post">
                      <Button
                        type="submit"
                        variant="solid"
                        color="red"
                        style={{ width: '150px' }}
                      >
                        Log out
                      </Button>
                    </form>
                  </div>
                </form>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
