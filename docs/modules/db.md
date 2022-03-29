[classfunc-helpers](../README.md) / [Exports](../modules.md) / db

# Namespace: db

## Table of contents

### Functions

- [batchSetAsync](db.md#batchsetasync)

## Functions

### batchSetAsync

▸ **batchSetAsync**(`db`, `values`, `collectionPath`, `docIdField`, `size?`, `setOptions?`): `Promise`<`unknown`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `db` | `object` | `undefined` |
| `values` | `any`[] | `undefined` |
| `collectionPath` | `string` | `undefined` |
| `docIdField` | `string` | `undefined` |
| `size` | `number` | `500` |
| `setOptions` | `Object` | `undefined` |
| `setOptions.merge` | `boolean` | `true` |

#### Returns

`Promise`<`unknown`[]\>

#### Defined in

[dbHelper.ts:6](https://github.com/ClassFunc/classfunc-helpers/blob/43d4baa/src/dbHelper.ts#L6)
