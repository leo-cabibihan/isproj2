import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import Link from "next/link";

export function LoginForm () {
    <form
          action={'/login-post'}
          method="post"
          className="mt-10 grid grid-cols-1 gap-y-8"
        >
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            minLength={10}
            required
          />
          
          <p className="mt-2 text-sm text-gray-700">
            <Link
              href="/forgot"
              className="font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
}