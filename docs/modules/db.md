[classfunc-helpers](../README.md) / [Exports](../modules.md) / db

# Namespace: db

## Table of contents

### Functions

- [batchSetAsync](db.md#batchsetasync)

## Functions

### batchSetAsync

▸ **batchSetAsync**(`db`, `values`, `size?`, `collectionPath`, `docIdField`, `setOptions?`): `Promise`<`unknown`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `db` | `object` | `undefined` |
| `values` | `any`[] | `undefined` |
| `size` | `number` | `500` |
| `collectionPath` | `string` | `undefined` |
| `docIdField` | `string` | `undefined` |
| `setOptions` | `Object` | `undefined` |
| `setOptions.merge` | `boolean` | `true` |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[dbHelper.ts:6](https://github.com/ClassFunc/classfunc-helpers/blob/74c7b26/src/dbHelper.ts#L6)
