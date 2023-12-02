// @ts-nocheck
"use client"
import { TextField } from '@/components/Fields';
import { Button } from '@/components/Button';
import React, { useState } from 'react';
import SlideOver from '@/components/SlideOverButton';

const Form: React.FC = () => {
    return (
        <SlideOver title="Set Custom Data" buttontext="Set Data" variant="solid" color="slate">
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
            <div className="col-span-full">
            <Button type="submit" variant="solid" color="green" className="w-full">
                <span>
                Set Data <span aria-hidden="true">&rarr;</span>
                </span>
            </Button>
            </div>
            </form>
        </SlideOver>
      );
    }
   
export default Form;
