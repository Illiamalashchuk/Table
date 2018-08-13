import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import App from '../../App';
import highlight from '../../reducers/highlight';


describe('highlight reducer', () => {
    it('should return the initial state', () => {
      expect(highlight(undefined, [])).toEqual([])
    })

    it('should handle HIGHLIGHT_CELLS', () => {
        const state = [
            { id: 1, highlight: false, cells: [
                { id: 1, highlight: false },
                { id: 2, highlight: false },
                { id: 3, highlight: false }
            ] },
            { id: 2, highlight: false, cells: [
                { id: 4, highlight: false },
                { id: 5, highlight: false },
                { id: 6, highlight: false }
            ] },
            { id: 3, highlight: false, cells: [
                { id: 7, highlight: false },
                { id: 8, highlight: false },
                { id: 9, highlight: false }
            ] }
        ]
        const values = {
            1: 125,
            2: 256,
            3: 458,
            4: 187,
            5: 658,
            6: 452,
            7: 236,
            8: 478,
            9: 124
        };
        const x = 2;
        const id = 2;
        expect(
            highlight(state, {
                type: 'HIGHLIGHT_CELLS',
                payload: { id, x, values }
            })
        ).toEqual([
            { id: 1, highlight: true, cells: [
                { id: 1, highlight: false },
                { id: 2, highlight: true },
                { id: 3, highlight: false }
            ] },
            { id: 2, highlight: true, cells: [
                { id: 4, highlight: true },
                { id: 5, highlight: false },
                { id: 6, highlight: false }
            ] },
            { id: 3, highlight: true, cells: [
                { id: 7, highlight: true },
                { id: 8, highlight: false },
                { id: 9, highlight: false }
            ] },
        ])

        expect(
            highlight(state, {
                type: 'SET_NEW_HIGHLIGHT',
                payload: [10, 11, 12]
            })
        ).toEqual([
            { id: 1, highlight: false, cells: [
                { id: 1, highlight: false },
                { id: 2, highlight: false },
                { id: 3, highlight: false }
            ] },
            { id: 2, highlight: false, cells: [
                { id: 4, highlight: false },
                { id: 5, highlight: false },
                { id: 6, highlight: false }
            ] },
            { id: 3, highlight: false, cells: [
                { id: 7, highlight: false },
                { id: 8, highlight: false },
                { id: 9, highlight: false }
            ] },
            { id: 4, highlight: false, cells: [
                { id: 10, highlight: false },
                { id: 11, highlight: false },
                { id: 12, highlight: false }
            ] }
        ])

        expect(
            highlight(state, {
                type: 'DELETE_HIGHLIGHT',
                payload: 0
            })
        ).toEqual([
            // { id: 1, highlight: false, cells: [
            //     { id: 1, highlight: false },
            //     { id: 2, highlight: false },
            //     { id: 3, highlight: false }
            // ] },
            { id: 2, highlight: false, cells: [
                { id: 4, highlight: false },
                { id: 5, highlight: false },
                { id: 6, highlight: false }
            ] },
            { id: 3, highlight: false, cells: [
                { id: 7, highlight: false },
                { id: 8, highlight: false },
                { id: 9, highlight: false }
            ] },
        ])
    })
})