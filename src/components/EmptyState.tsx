import React from 'react'
import { AutoColumn } from './Column'
import { Type } from '../theme'

export function EmptyState({ message }: { message: string }): JSX.Element {
    return (
        <AutoColumn style={{ minHeight: 200, justifyContent: 'center', alignItems: 'center' }}>
            <Type.Body>{message}</Type.Body>
        </AutoColumn>
    )
}
