// @ts-nocheck
// components/EmailMessage.tsx

import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Tailwind,
    Text,
    Button
} from '@react-email/components';
import * as React from 'react';

export function Email(props: any) {
    const { url } = props;
    const previewText = "You've been Invited!"

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className='bg-white my-auto mx-auto font-sans'>
                    <Container className='my-[20px] mx-auto p-[20px] max-w-4xl'>
                        <Heading className='text-black text-[20px] font-normal text-left'>
                            <strong>Hello there!</strong>
                        </Heading>
                        <Button
                            href={url}
                            style={{ color: "#61dafb", padding: "10px 20px" }}
                        >
                            <h1>Click Me</h1>
                        </Button>

                        <Hr className='my-[16px] mx-0 w-full' />
                        <Text className='text-[#666666] text-[12px]'>
                            In a world where every email matters, Resend empowers you to send emails that captivate, engage, and convert. Its more than just an email platform; its a catalyst for modernizing your email communication.
                            Dont settle for outdated email practices. Embrace the future of email communication with Resend and watch your messages soar to new heights.
                        </Text>
                        <Text className='text-[#666666] text-[12px]'>
                            This email is delivered to you through the Resend SDK
                            integrations.✨
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export function AlertEmail(props: any) {
    const { url } = props.URL;
    const heading = props.heading;
    const content = props.content;
    const previewText = "You have an Alert"

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className='bg-white my-auto mx-auto font-sans'>
                    <Container className='my-[20px] mx-auto p-[20px] max-w-4xl'>
                        <Heading className='text-black text-[20px] font-normal text-left'>
                            <strong>{heading}</strong>
                        </Heading>
                        <Text className='text-[#000000] text-[20px]'>
                            {content}
                        </Text>
                        <Button
                            href={url}
                            style={{ color: "#61dafb", padding: "10px 20px" }}
                        >
                            <h1>Click Me</h1>
                        </Button>

                        <Hr className='my-[16px] mx-0 w-full' />
                        <Text className='text-[#666666] text-[12px]'>
                            In a world where every email matters, Resend empowers you to send emails that captivate, engage, and convert. Its more than just an email platform; its a catalyst for modernizing your email communication.
                            Dont settle for outdated email practices. Embrace the future of email communication with Resend and watch your messages soar to new heights.
                        </Text>
                        <Text className='text-[#666666] text-[12px]'>
                            This email is delivered to you through the Resend SDK
                            integrations.✨
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export function NoURLMail(props: any) {
    const heading = props.heading;
    const content = props.content;
    const previewText = "You have an Alert"

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className='bg-white my-auto mx-auto font-sans'>
                    <Container className='my-[20px] mx-auto p-[20px] max-w-4xl'>
                        <Heading className='text-black text-[20px] font-normal text-left'>
                            <strong>{heading}</strong>
                        </Heading>
                        <Text className='text-[#000000] text-[20px]'>
                            {content}
                        </Text>

                        <Hr className='my-[16px] mx-0 w-full' />
                        <Text className='text-[#666666] text-[12px]'>
                            In a world where every email matters, Resend empowers you to send emails that captivate, engage, and convert. Its more than just an email platform; its a catalyst for modernizing your email communication.
                            Dont settle for outdated email practices. Embrace the future of email communication with Resend and watch your messages soar to new heights.
                        </Text>
                        <Text className='text-[#666666] text-[12px]'>
                            This email is delivered to you through the Resend SDK
                            integrations.✨
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export function ReceiptEmail(props: any) {
    const heading = props.heading;
    const content = props.content;
    const content_2 = props.content_2;
    const previewText = "You have an Alert"
    const children = props.children

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className='bg-white my-auto mx-auto font-sans'>
                    <Container className='my-[20px] mx-auto p-[20px] max-w-4xl'>
                        <Heading className='text-black text-[20px] font-normal text-left'>
                            <strong>{heading}</strong>
                        </Heading>

                        <Text className='text-[#000000] text-[20px]'>
                            Thank you for your donation! Here is your receipt
                        </Text>

                        <Text className='text-[#000000] text-[20px]'>
                            TRANSACTION DETAILS:
                        </Text>
                        <Text>
                            Date Donated: {content![0].date}
                        </Text>
                        <>
                            {content_2?.map(item => (
                                <>
                                    <Text className='text-[#000000] text-[20px]'>
                                        ITEM DETAILS:
                                    </Text>
                                    <ol>
                                        <li>Item Name: {item.name}</li>
                                        <li>Quantity: {item.quantity} {item.unit_of_measurement}</li>
                                        {item.perishable ?
                                            (<li>Expiration Date: {item.expiry}</li>) :
                                            (<li>Not Perishable</li>)}
                                    </ol>
                                </>
                            ))}
                        </>

                        <Hr className='my-[16px] mx-0 w-full' />
                        <Text className='text-[#666666] text-[12px]'>
                            In a world where every email matters, Resend empowers you to send emails that captivate, engage, and convert. Its more than just an email platform; its a catalyst for modernizing your email communication.
                            Dont settle for outdated email practices. Embrace the future of email communication with Resend and watch your messages soar to new heights.
                        </Text>
                        <Text className='text-[#666666] text-[12px]'>
                            This email is delivered to you through the Resend SDK
                            integrations.✨
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export function CashReceiptEmail(props: any) {
    const heading = props.heading;
    const content = props.content;
    const previewText = "You have an Alert"
    const children = props.children

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className='bg-white my-auto mx-auto font-sans'>
                    <Container className='my-[20px] mx-auto p-[20px] max-w-4xl'>
                        <Heading className='text-black text-[20px] font-normal text-left'>
                            <strong>{heading}</strong>
                        </Heading>

                        <Text className='text-[#000000] text-[20px]'>
                            Thank you for your donation! Here is your receipt
                        </Text>

                        <Text className='text-[#000000] text-[20px]'>
                            TRANSACTION DETAILS:
                        </Text>
                        <Text className='text-[#000000] text-[20px]'>
                            DONATION DETAILS:
                        </Text>
                        <ol>
                            <li>Donation Amount: {content.amount}</li>
                            <li>Donor Name: {content.donor}</li>
                            <li>Donated on: {content.date}</li>
                            <li>Donated to: {content.charity}</li>
                            <li>Target Event: {content.event}</li>
                        </ol>
                        <Hr className='my-[16px] mx-0 w-full' />
                        <Text className='text-[#666666] text-[12px]'>
                            In a world where every email matters, Resend empowers you to send emails that captivate, engage, and convert. Its more than just an email platform; its a catalyst for modernizing your email communication.
                            Dont settle for outdated email practices. Embrace the future of email communication with Resend and watch your messages soar to new heights.
                        </Text>
                        <Text className='text-[#666666] text-[12px]'>
                            This email is delivered to you through the Resend SDK
                            integrations.✨
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}