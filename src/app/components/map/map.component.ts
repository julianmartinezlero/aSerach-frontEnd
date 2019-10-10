import {Component, OnInit} from '@angular/core';
import {Point} from '../../models/point';
import {Arista} from '../../models/arista';
import {AstarService} from '../../service/astar.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  points: Point[] = [];
  aristas: Arista[] = [];
  result: Arista[] = [];
  pointA: Point = null;
  pointB: Point = null;
  point: Point;
  color = '#226bfc';
  colorRes = '#ffd600';
  origin: Point;
  destin: Point;
  inPointSelectOrigin = false;
  inPointSelectDestin = false;

  constructor(private astar: AstarService) { }

  ngOnInit() {
  }
  pointSelect(point) {
    if (!this.inPointSelectDestin && !this.inPointSelectOrigin) {
      if (this.pointA) {
        this.pointB = {x: point.x, y: point.y};
        this.pointB.label = point.label;
        const ar: Arista = {
          pointA: this.pointA,
          pointB: this.pointB,
          value: this.distanceAB(this.pointA, this.pointB)
        };
        this.aristas.push(ar);
        this.pointA = null;
        this.pointB = null;
      } else {
        this.pointA = point;
        this.pointB = {x: this.pointA.x, y: this.pointA.y, heuristic: null};
      }
    } else {
      if (this.inPointSelectOrigin) {
        this.origin = point;
        this.inPointSelectOrigin = false;
      }
      if (this.inPointSelectDestin) {
        this.destin = point;
        this.inPointSelectDestin = false;
      }
    }
    this.point = null;
  }
  markPoint(evt) {
    if (!this.pointA) {
      this.point = {x: evt.offsetX, y: evt.offsetY };
    }
  }
  save(val, heuristic) {
    this.point.label = val;
    this.point.heuristic = heuristic;
    this.points.push({
      x: this.point.x,
      y: this.point.y,
      heuristic: heuristic,
      label: val
    });
    this.point = null;
  }
  movePointB(evt) {
    if (this.pointA) {
      this.pointB.x = evt.offsetX;
      this.pointB.y = evt.offsetY;
    }
  }
  escape(e) {
    this.pointA = null;
    this.pointB = null;
    this.point = null;
    this.inPointSelectDestin = false;
    this.inPointSelectOrigin = false;
  }

  calcHeuristic() {
    this.points.forEach(p => {
      p.heuristic = this.distanceAB(p, this.origin);
    });
    console.log(this.aristas, this.points);
  }
  selectOrigin() {
    this.inPointSelectOrigin = true;
  }
  selectDestin() {
    this.inPointSelectDestin = true;
  }

  distanceAB(pointA: Point, pointB: Point) {
    return Math.round(Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)));
  }
  deletePoint(i) {
    const poin = this.points[i];
    this.aristas.forEach((f, index) => {
      if ( f.pointB.label === poin.label  || f.pointA.label === poin.label) {
        this.aristas.splice(index, i);
      }
    });
    this.points.splice(i, 1);
  }
  cancelNode() {
    this.point = null;
  }

  startAlgoritm() {
    const data = {
      aristas: this.aristas,
      nodos: this.points,
      origin: this.origin,
      destin: this.destin
    };
    this.astar.aSearch(data).subscribe(res => {
      this.result = this.makeResult(res);
      console.log(this.result);
    });
  }
  makeResult(res: any): any {
    const listr = [];
    res.forEach((r: any) => {
      if (r.length > 1) {
        listr.push(
          this.aristas.find((s: any) => {
          return s.pointA.label === r[0] && s.pointB.label === r[1] || s.pointA.label === r[1] && s.pointB.label === r[0];
        }));
      }
    });
    return listr;
  }
  reset() {
    this.points = [];
    this.aristas = [];
    this.result = [];
    this.origin = null;
    this.destin = null;
  }
}
