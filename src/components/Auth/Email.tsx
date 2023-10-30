import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Text,
} from '@react-email/components';
import * as React from 'react';

export default function Email({ otp }) {
    return (
        <Html>
            <Head />
            <Preview>Your login code for Keysentry</Preview>
            <Body>
                <Container>
                    <Heading className='text-xl'>Your login code for Keysentry</Heading>
                    <Text >
                        This code will only be valid to get into the database.
                    </Text>
                    <code className='bg-green-100 text-2xl'>{otp}</code>
                    <Text >
                        Thank you!
                    </Text>
                    <Hr />
                </Container>
            </Body>
        </Html>
    )
}

