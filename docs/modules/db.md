[classfunc-helpers](../README.md) / [Exports](../modules.md) / db

# Namespace: db

## Table of contents

### Functions

- [batchSetAsync](db.md#batchsetasync)

## Functions

### batchSetAsync

▸ **batchSetAsync**(`db`, `values`, `collectionPath`, `idField`, `setValue?`, `setOptions?`, `size?`): `Promise`<`unknown`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `db` | `object` | `undefined` |
| `values` | `any`[] | `undefined` |
| `collectionPath` | `string` | `undefined` |
| `idField` | `string` \| (`value`: `any`) => `string` | `undefined` |
| `setValue?` | (`value`: `any`) => `object` | `undefined` |
| `setOptions?` | `Object` | `undefined` |
| `setOptions.merge` | `boolean` | `true` |
| `size?` | `number` | `500` |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[dbHelper.ts:11](https://github.com/ClassFunc/classfunc-helpers/blob/54c3f24/src/dbHelper.ts#L11)
